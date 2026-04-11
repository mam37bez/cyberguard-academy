import { SITE_URL } from '@/lib/site';

export type BreadcrumbItem = { name: string; path: string };

/** Канонический BreadcrumbList для JSON-LD (path — путь без домена, например `/courses`). */
export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}
