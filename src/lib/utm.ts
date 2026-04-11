import { SITE_URL } from '@/lib/site';

export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

/** Добавляет UTM-параметры к абсолютному URL (канонический домен из SITE_URL). */
export function withUtm(pathOrAbsoluteUrl: string, params: UtmParams): string {
  const base = pathOrAbsoluteUrl.startsWith('http')
    ? pathOrAbsoluteUrl
    : `${SITE_URL.replace(/\/$/, '')}/${pathOrAbsoluteUrl.replace(/^\//, '')}`;
  const u = new URL(base);
  u.searchParams.set('utm_source', params.utm_source);
  u.searchParams.set('utm_medium', params.utm_medium);
  if (params.utm_campaign) u.searchParams.set('utm_campaign', params.utm_campaign);
  if (params.utm_content) u.searchParams.set('utm_content', params.utm_content);
  if (params.utm_term) u.searchParams.set('utm_term', params.utm_term);
  return u.toString();
}

/** Готовые ссылки для кампаний (копировать в посты Reddit, Telegram и т.д.). */
export const marketingHomepageUrls = {
  reddit: withUtm('/', {
    utm_source: 'reddit',
    utm_medium: 'social',
    utm_campaign: 'site_share',
    utm_content: 'homepage',
  }),
  telegram: withUtm('/', {
    utm_source: 'telegram',
    utm_medium: 'social',
    utm_campaign: 'site_share',
    utm_content: 'homepage',
  }),
  twitter: withUtm('/', {
    utm_source: 'twitter',
    utm_medium: 'social',
    utm_campaign: 'site_share',
    utm_content: 'homepage',
  }),
  sideproject: withUtm('/', {
    utm_source: 'reddit',
    utm_medium: 'social',
    utm_campaign: 'sideproject_post',
    utm_content: 'homepage',
  }),
} as const;

export const marketingQuizUrl = withUtm('/quiz', {
  utm_source: 'reddit',
  utm_medium: 'social',
  utm_campaign: 'site_share',
  utm_content: 'quiz',
});
