import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { courses } from '@/data/courses';
import { formatPrice } from '@/lib/utils';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Курсы кибербезопасности — CyberGuard Academy',
  description:
    'Курсы CyberGuard Academy по кибербезопасности для детей, подростков и родителей: базовый, средний и продвинутый уровни.',
  alternates: {
    canonical: `${SITE_URL}/courses`,
  },
};

const coursesListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Курсы CyberGuard Academy',
  description: 'Программы обучения кибербезопасности для детей, подростков и родителей.',
  numberOfItems: courses.length,
  itemListElement: courses.map((course, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: course.title,
    url: `${SITE_URL}/courses/${course.slug}`,
    description: course.description,
  })),
};

export default function CoursesPage() {
  const levelLabels: Record<string, string> = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  const levelColors: Record<string, 'success' | 'warning' | 'danger'> = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger',
  };

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesListJsonLd) }}
      />
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="Все программы"
          title="Курсы"
          subtitle="Выберите программу обучения по возрасту и уровню подготовки"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {courses.map((c) => (
            <Card key={c.id} variant="gradient" className="flex flex-col border-white/[0.06]">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{c.icon}</span>
                  <Badge variant={levelColors[c.level]}>{levelLabels[c.level]}</Badge>
                </div>

                <h2 className="text-2xl font-semibold text-white mb-3 tracking-tight">{c.title}</h2>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{c.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Возраст:</span> {c.ageGroup}
                  </div>
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Длительность:</span> {c.duration}
                  </div>
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Рейтинг:</span> {c.rating}/5
                  </div>
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Формат:</span> {c.schedule}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <Badge key={s} variant="outline" size="sm">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex justify-between items-center gap-4">
                <span className="text-2xl font-semibold text-white tabular-nums">
                  {formatPrice(c.price)}
                  <span className="text-slate-600 text-sm font-normal">/мес</span>
                </span>

                <div className="flex flex-wrap gap-2 justify-end">
                  <ButtonLink href={`/courses/${c.slug}`} variant="ghost" size="sm">
                    Подробнее
                  </ButtonLink>
                  <ButtonLink href="/enrollment" variant="primary" size="sm">
                    Записаться
                  </ButtonLink>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
