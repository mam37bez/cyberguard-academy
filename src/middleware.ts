import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * API-only middleware: same-origin guard for mutating requests, no-store cache,
 * minimal fingerprint surface for bots probing /api/*.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const method = request.method;
  if (method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  if (method !== 'GET' && method !== 'HEAD') {
    const origin = request.headers.get('origin');
    const expected = request.nextUrl.origin;
    if (origin && origin !== expected) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'no-store, max-age=0');
  return res;
}

export const config = {
  matcher: '/api/:path*',
};
