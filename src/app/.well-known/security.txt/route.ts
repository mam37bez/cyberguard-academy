import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

/** RFC 9116 — контакт для ответственного раскрытия уязвимостей (синхронизируйте с реальным процессом). */
export function GET() {
  const canonical = `${SITE_URL}/.well-known/security.txt`;
  const body = [
    `Contact: ${SITE_URL}/contact`,
    'Preferred-Languages: ru, en',
    `Canonical: ${canonical}`,
    '',
  ].join('\n');

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
