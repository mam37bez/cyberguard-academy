import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

const SAFE_BROWSING_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

/** Лимит на IP: при REDIS_URL — общий для всех инстансов; иначе in-memory в пределах инстанса. */
const RATE_MAX = 30;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const MAX_URL_LENGTH = 2048;

const THREAT_TYPES = [
  'MALWARE',
  'SOCIAL_ENGINEERING',
  'UNWANTED_SOFTWARE',
  'POTENTIALLY_HARMFUL_APPLICATION',
] as const;

type GoogleThreatMatch = {
  threatType?: string;
  platformType?: string;
  threat?: { url?: string };
};

type GoogleFindResponse = {
  matches?: GoogleThreatMatch[];
};

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim().slice(0, 64);
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim().slice(0, 64);
  return 'unknown';
}

function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local')) return true;
  const ipv4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = h.match(ipv4);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 127 || a === 0) return true;
    if (a === 10) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }
  return false;
}

function normalizeInputUrl(raw: string): URL | null {
  const t = raw.trim();
  if (!t || t.length > MAX_URL_LENGTH) return null;
  try {
    return new URL(t);
  } catch {
    try {
      return new URL(`https://${t}`);
    } catch {
      return null;
    }
  }
}

function isAllowedForCheck(url: URL): boolean {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
  if (isBlockedHost(url.hostname)) return false;
  if (url.href.length > MAX_URL_LENGTH) return false;
  return true;
}

const THREAT_LABELS: Record<string, string> = {
  MALWARE: 'вредоносное ПО',
  SOCIAL_ENGINEERING: 'фишинг / социальная инженерия',
  UNWANTED_SOFTWARE: 'нежелательное ПО',
  POTENTIALLY_HARMFUL_APPLICATION: 'потенциально опасное приложение',
  THREAT_TYPE_UNSPECIFIED: 'неизвестная угроза',
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'Проверка Safe Browsing не настроена на сервере.', code: 'not_configured' },
      { status: 503 },
    );
  }

  const ip = getClientIp(req);
  if (await checkRateLimit('safe-browsing', ip, RATE_MAX, RATE_WINDOW_MS)) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Слишком много запросов. Попробуйте позже (лимит для защиты сервиса).',
        code: 'rate_limited',
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректное тело запроса.', code: 'bad_json' }, { status: 400 });
  }

  const urlRaw = typeof body === 'object' && body !== null && 'url' in body ? String((body as { url: unknown }).url) : '';
  const url = normalizeInputUrl(urlRaw);
  if (!url || !isAllowedForCheck(url)) {
    return NextResponse.json(
      { ok: false, error: 'Укажите корректный URL (http/https), не локальный и не служебный адрес.', code: 'invalid_url' },
      { status: 400 },
    );
  }

  const checkUrl = url.href;

  let googleRes: Response;
  try {
    googleRes = await fetch(`${SAFE_BROWSING_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: {
          clientId: 'cyberguard-academy',
          clientVersion: '1.0.0',
        },
        threatInfo: {
          threatTypes: [...THREAT_TYPES],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url: checkUrl }],
        },
      }),
      next: { revalidate: 0 },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Не удалось связаться с сервисом Google. Попробуйте позже.', code: 'upstream_network' },
      { status: 502 },
    );
  }

  if (!googleRes.ok) {
    await googleRes.text().catch(() => '');
    if (googleRes.status === 403 || googleRes.status === 400) {
      return NextResponse.json(
        { ok: false, error: 'Запрос отклонён (проверьте ключ API и включённый Safe Browsing API).', code: 'google_rejected' },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { ok: false, error: 'Сервис проверки вернул ошибку.', code: 'google_error' },
      { status: 502 },
    );
  }

  let data: GoogleFindResponse;
  try {
    data = (await googleRes.json()) as GoogleFindResponse;
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный ответ сервиса.', code: 'bad_response' }, { status: 502 });
  }

  const matches = data.matches;
  if (!matches || matches.length === 0) {
    return NextResponse.json({
      ok: true,
      status: 'clean' as const,
      message: 'В списках угроз Safe Browsing (на момент проверки) совпадений не найдено.',
    });
  }

  const threats = [
    ...new Set(
      matches
        .map((m) => m.threatType)
        .filter(Boolean)
        .map((t) => THREAT_LABELS[t as string] || t),
    ),
  ];

  return NextResponse.json({
    ok: true,
    status: 'threat' as const,
    threats,
    message:
      'Google Safe Browsing сообщает о совпадении с известными угрозами. Не вводите данные на этом сайте и не скачивайте файлы.',
  });
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
