import { NextRequest, NextResponse } from 'next/server';
import { getResendClient } from '@/lib/resend';
import { isRateLimited } from '@/lib/rate-limit-memory';

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

function getRecipientByBranch(branch: string): string | null {
  const normalized = branch.toLowerCase();

  if (normalized === 'grodno') return 'grodno@kiber-one.com';
  if (normalized === 'brest') return 'brest@kiber-one.com';

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (isRateLimited(enrollmentRateLimit, ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
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
    const branch = clean(body.branch);
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

    if (!pn || !pe || !pp || !cn || !ca || !ci || !branch || !agree) {
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

    const recipient = getRecipientByBranch(branch);
    if (!recipient) {
      return NextResponse.json({ error: 'Selected branch is not supported yet' }, { status: 400 });
    }

    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json(
        { error: 'Сервис отправки писем временно недоступен. Попробуйте позже или напишите напрямую в филиал.' },
        { status: 503 }
      );
    }

    await resend.emails.send({
      from: 'CyberGuard Academy <onboarding@resend.dev>',
      to: recipient,
      subject: `Новая заявка на обучение: ${branch}`,
      replyTo: pe,
      text: `Новая заявка на обучение с сайта CyberGuard Academy

Филиал: ${branch}
Родитель: ${pn}
Email: ${pe}
Телефон: ${pp}
Ученик: ${cn}
Возраст: ${ca}
Курс: ${ci}
Согласие: ${agree ? 'Да' : 'Нет'}
`,
    });

    console.log('Enrollment submission sent:', {
      parentEmail: pe,
      courseId: ci,
      branch,
      recipient,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Enrollment route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
