import { createClient } from 'redis';
import { isRateLimited, type RateLimitEntry } from '@/lib/rate-limit-memory';

/**
 * Лимиты запросов: при REDIS_URL (Vercel KV / Redis) счётчики общие между инстансами serverless.
 * Без REDIS_URL или при сбое подключения — прежний in-memory fallback (как раньше).
 */

type RedisClient = ReturnType<typeof createClient>;

declare global {
  // eslint-disable-next-line no-var -- переиспользование сокета в одном лямбда-инстансе
  var __cgaRedis: RedisClient | undefined;
}

const fallbackMaps = new Map<string, Map<string, RateLimitEntry>>();

function getFallbackMap(prefix: string): Map<string, RateLimitEntry> {
  let m = fallbackMaps.get(prefix);
  if (!m) {
    m = new Map();
    fallbackMaps.set(prefix, m);
  }
  return m;
}

function redisUrl(): string | undefined {
  const u = process.env.REDIS_URL?.trim();
  return u || undefined;
}

function sanitizeIdentity(raw: string): string {
  const s = raw.trim().slice(0, 128);
  if (!s) return 'unknown';
  return s.replace(/[\r\n]/g, '');
}

let connectPromise: Promise<unknown> | null = null;

async function getRedis(): Promise<RedisClient | null> {
  const url = redisUrl();
  if (!url) return null;

  if (!globalThis.__cgaRedis) {
    const client = createClient({ url });
    client.on('error', (err) => {
      console.error('[rate-limit] Redis:', err.message);
    });
    globalThis.__cgaRedis = client;
  }

  const client = globalThis.__cgaRedis;
  if (client.isOpen) return client;

  try {
    if (!connectPromise) {
      connectPromise = client.connect().finally(() => {
        connectPromise = null;
      });
    }
    await connectPromise;
    return client.isOpen ? client : null;
  } catch {
    return null;
  }
}

/**
 * @returns true если лимит превышен (нужно ответить 429)
 */
export async function checkRateLimit(
  prefix: string,
  identity: string,
  maxRequests: number,
  windowMs: number,
): Promise<boolean> {
  const key = sanitizeIdentity(identity);
  const mem = getFallbackMap(prefix);

  const redis = await getRedis();
  if (!redis) {
    return isRateLimited(mem, key, maxRequests, windowMs);
  }

  try {
    const redisKey = `cga:rl:${prefix}:${key}`;
    const ttlSec = Math.max(1, Math.ceil(windowMs / 1000));
    const n = await redis.incr(redisKey);
    if (n === 1) {
      await redis.expire(redisKey, ttlSec);
    }
    return n > maxRequests;
  } catch {
    return isRateLimited(mem, key, maxRequests, windowMs);
  }
}
