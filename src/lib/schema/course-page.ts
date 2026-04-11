import type { Course } from '@/types';
import { SITE_URL } from '@/lib/site';
import { buildBreadcrumbListJsonLd } from '@/lib/schema/breadcrumb-list';

const levelLabel: Record<string, string> = {
  beginner: 'Начальный уровень',
  intermediate: 'Средний уровень',
  advanced: 'Продвинутый уровень',
};

/**
 * JSON-LD для страницы курса: Course + BreadcrumbList в одном @graph
 * (совместимо с глобальным Organization в layout по URL сайта).
 */
export function buildCoursePageJsonLd(course: Course) {
  const courseUrl = `${SITE_URL}/courses/${course.slug}`;
  const description = (course.fullDescription || course.description).trim();

  const courseEntity: Record<string, unknown> = {
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    name: course.title,
    description,
    url: courseUrl,
    inLanguage: 'ru-RU',
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'CyberGuard Academy',
      url: SITE_URL,
    },
    educationalLevel: levelLabel[course.level] || course.level,
    teaches: course.topics,
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency,
      availability: course.enrollmentOpen
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/enrollment`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['online', 'onsite'],
      courseWorkload: course.schedule,
    },
  };

  if (course.rating > 0 && course.reviewCount > 0) {
    courseEntity.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      reviewCount: course.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  courseEntity.instructor = {
    '@type': 'Person',
    name: course.instructor.name,
    jobTitle: course.instructor.title,
    description: course.instructor.bio,
  };

  const breadcrumb = buildBreadcrumbListJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Курсы', path: '/courses' },
    { name: course.title, path: `/courses/${course.slug}` },
  ]);

  return {
    '@context': 'https://schema.org',
    '@graph': [courseEntity, breadcrumb],
  };
}
