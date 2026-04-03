import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME = 100;
const MAX_EMAIL = 150;
const MAX_PHONE = 30;
const MAX_SUBJECT = 150;
const MAX_MESSAGE = 5000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const contactRateLimit = new Map<string, { count: number; resetTime: number }>();

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
  const entry = contactRateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    contactRateLimit.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  contactRateLimit.set(ip, entry);
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

function getRecipientByBranch(branch: string): string | null {
  const normalized = branch.toLowerCase();

  if (normalized === 'grodno') return 'grodno@kiber-one.com';
  if (normalized === 'brest') return 'brest@kiber-one.com';

  return null;
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

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const subject = clean(body.subject);
    const message = clean(body.message);
    const branch = clean(body.branch);
    const website = clean(body.website);
    const turnstileToken = clean(body.turnstileToken);

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

    if (!name || !email || !subject || !message || !branch) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (
      name.length > MAX_NAME ||
      email.length > MAX_EMAIL ||
      phone.length > MAX_PHONE ||
      subject.length > MAX_SUBJECT ||
      message.length > MAX_MESSAGE
    ) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const recipient = getRecipientByBranch(branch);
    if (!recipient) {
      return NextResponse.json({ error: 'Selected branch is not supported yet' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'CyberGuard Academy <onboarding@resend.dev>',
      to: recipient,
      subject: `Новая заявка с сайта: ${subject}`,
      replyTo: email,
      text: `Новая заявка с сайта CyberGuard Academy

Филиал: ${branch}
Имя: ${name}
Email: ${email}
Телефон: ${phone || 'Не указан'}
Тема: ${subject}

Сообщение:
${message}
`,
    });

    console.log('Contact submission sent:', {
      email,
      branch,
      subject,
      recipient,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
