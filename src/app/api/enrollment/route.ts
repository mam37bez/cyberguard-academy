import { NextRequest, NextResponse } from 'next/server';

const MAX_NAME = 120;
const MAX_EMAIL = 150;
const MAX_PHONE = 30;
const MAX_AGE = 20;
const MAX_COURSE = 80;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const enrollmentRateLimit = new Map<string, { count: number; resetTime: number }>();

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = enrollmentRateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    enrollmentRateLimit.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  enrollmentRateLimit.set(ip, entry);
  return false;
}

async function verifyTurnstile(token: string, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) return false;

  const formData = new FormData();
  formData.append('secret', secret);
  formData.append('response', token);
  if (ip) formData.append('remoteip', ip);

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const data = await result.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
    }

    const body = await req.json();

    const pn = clean(body.pn);
    const pe = clean(body.pe);
    const pp = clean(body.pp);
    const cn = clean(body.cn);
    const ca = clean(body.ca);
    const ci = clean(body.ci);
    const website = clean(body.website);
    const turnstileToken = clean(body.turnstileToken);
    const agree = body.agree === true;

    if (website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: 'Turnstile verification required' }, { status: 400 });
    }

    const isHuman = await verifyTurnstile(turnstileToken, ip);

    if (!isHuman) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 });
    }

    if (!pn || !pe || !pp || !cn || !ca || !ci || !agree) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (
      pn.length > MAX_NAME ||
      pe.length > MAX_EMAIL ||
      pp.length > MAX_PHONE ||
      cn.length > MAX_NAME ||
      ca.length > MAX_AGE ||
      ci.length > MAX_COURSE
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    if (!isValidEmail(pe)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const safePayload = {
      parentName: pn,
      parentEmail: pe,
      parentPhone: pp,
      childName: cn,
      childAge: ca,
      courseId: ci,
      createdAt: new Date().toISOString(),
    };

    console.log('Enrollment submission received:', {
      parentEmail: safePayload.parentEmail,
      courseId: safePayload.courseId,
      createdAt: safePayload.createdAt,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
