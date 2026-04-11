/** Канонический URL сайта (SEO, sitemap, schema.org). При смене домена обновите здесь и в Vercel. */
export const SITE_URL = 'https://cyberguard-academy.vercel.app' as const;

/**
 * Публичные URL для schema.org sameAs — только реально существующие профили
 * (иначе поисковики получают «битые» сигналы доверия).
 */
export const ORGANIZATION_SAME_AS: readonly string[] = [
  'https://www.reddit.com/user/Parking-Flamingo4485/',
];
