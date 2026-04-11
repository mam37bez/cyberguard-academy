import type { BlogPost } from '@/types';
import { SITE_URL } from '@/lib/site';
import { buildBreadcrumbListJsonLd } from '@/lib/schema/breadcrumb-list';

function toIsoDate(dateStr: string): string {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? dateStr : d.toISOString();
}

function approximateWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * JSON-LD для статьи блога: BlogPosting + BreadcrumbList в одном @graph.
 * Полный текст статьи в разметку не дублируется (уменьшение HTML и дублирования с видимым контентом).
 */
export function buildBlogPostJsonLd(post: BlogPost) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const published = toIsoDate(post.date);
  const imageUrl = `${SITE_URL}/opengraph-image`;

  const article: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt.trim(),
    image: [imageUrl],
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'CyberGuard Academy',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon`,
      },
    },
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    inLanguage: 'ru-RU',
    isAccessibleForFree: true,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: approximateWordCount(post.content),
  };

  const breadcrumb = buildBreadcrumbListJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Блог', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumb],
  };
}
