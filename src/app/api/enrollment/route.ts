import { NextRequest, NextResponse } from 'next/server';

const MAX_NAME = 120;
const MAX_EMAIL = 150;
const MAX_PHONE = 30;
const MAX_AGE = 20;
const MAX_COURSE = 80;

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

    const pn = clean(body.pn);
    const pe = clean(body.pe);
    const pp = clean(body.pp);
    const cn = clean(body.cn);
    const ca = clean(body.ca);
    const ci = clean(body.ci);
    const website = clean(body.website); // honeypot
    const agree = body.agree === true;

    if (website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
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
