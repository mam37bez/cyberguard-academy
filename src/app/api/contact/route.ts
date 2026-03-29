import { NextRequest, NextResponse } from 'next/server';

const MAX_NAME = 100;
const MAX_EMAIL = 150;
const MAX_PHONE = 30;
const MAX_SUBJECT = 150;
const MAX_MESSAGE = 5000;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: NextRequest) {
  try {
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
    const website = clean(body.website); // honeypot

    if (website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    if (!name || !email || !subject || !message) {
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

    const safePayload = {
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    console.log('Contact submission received:', {
      email: safePayload.email,
      subject: safePayload.subject,
      createdAt: safePayload.createdAt,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
