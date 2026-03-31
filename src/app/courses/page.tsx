import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { courses } from '@/data/courses';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Курсы',
  description:
    'Курсы CyberGuard Academy по кибербезопасности для детей, подростков и родителей: базовый, средний и продвинутый уровни.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/courses',
  },
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
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Все программы"
          title="Курсы"
          subtitle="Выберите программу обучения по возрасту и уровню подготовки"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((c) => (
            <Card key={c.id} variant="gradient" className="flex flex-col">
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">{c.icon}</span>
                  <Badge variant={levelColors[c.level]}>{levelLabels[c.level]}</Badge>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">{c.title}</h2>
                <p className="text-gray-400 mb-4">{c.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="text-gray-400">
                    <span className="text-white font-medium">Возраст:</span> {c.ageGroup}
                  </div>
                  <div className="text-gray-400">
                    <span className="text-white font-medium">Длительность:</span> {c.duration}
                  </div>
                  <div className="text-gray-400">
                    <span className="text-white font-medium">Рейтинг:</span> {c.rating}/5
                  </div>
                  <div className="text-gray-400">
                    <span className="text-white font-medium">Формат:</span> {c.schedule}
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
                <span className="text-2xl font-bold text-white">
                  {formatPrice(c.price)}/мес
                </span>

                <div className="flex gap-2">
                  <Link href={'/courses/' + c.slug}>
                    <Button variant="ghost" size="sm">
                      Подробнее
                    </Button>
                  </Link>
                  <Link href="/enrollment">
                    <Button variant="primary" size="sm">
                      Записаться
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
