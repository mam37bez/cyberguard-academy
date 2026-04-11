/** In-memory rate limiter for serverless routes (per-instance). Prunes stale entries to cap memory use. */

export type RateLimitEntry = { count: number; resetTime: number };

const DEFAULT_MAX_KEYS = 4000;

export function isRateLimited(
  map: Map<string, RateLimitEntry>,
  key: string,
  maxRequests: number,
  windowMs: number,
  maxKeys = DEFAULT_MAX_KEYS,
): boolean {
  const now = Date.now();

  if (map.size > maxKeys) {
    for (const [k, v] of map) {
      if (now > v.resetTime) map.delete(k);
    }
  }

  const entry = map.get(key);

  if (!entry || now > entry.resetTime) {
    map.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  map.set(key, entry);
  return false;
}
