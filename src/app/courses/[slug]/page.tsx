import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { courses, getCourseBySlug } from '@/data/courses';
import { formatPrice } from '@/lib/utils';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Курс не найден',
    };
  }

  const url = `https://cyberguard-academy.vercel.app/courses/${course.slug}`;
  const description =
    course.fullDescription ||
    course.description ||
    `Курс ${course.title} в CyberGuard Academy.`;

  return {
    title: course.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: course.title,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.title,
      description,
    },
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Главная</Link> /{' '}
          <Link href="/courses" className="hover:text-white">Курсы</Link> /{' '}
          <span className="text-white">{course.title}</span>
        </nav>

        <div className="mb-12">
          <span className="text-5xl">{course.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">{course.title}</h1>
          <p className="text-lg text-gray-400">{course.fullDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-4">📚 Темы</h2>
                <ul className="space-y-3">
                  {course.topics.map((t, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-cyber-green">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-6">📋 Программа</h2>
                <div className="space-y-4">
                  {course.modules.map((m, i) => (
                    <div key={m.id} className="p-4 rounded-xl bg-cyber-dark/50 border border-cyber-border">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{m.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{m.description}</p>
                          <div className="flex gap-4 mt-2 text-xs text-gray-500">
                            <span>📖 {m.lessons} уроков</span>
                            <span>⏱️ {m.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-28">
            <Card variant="glow">
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-white">{formatPrice(course.price)}</div>
                  <div className="text-gray-500">в месяц</div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  {[
                    ['Возраст', course.ageGroup],
                    ['Длительность', course.duration],
                    ['Расписание', course.schedule],
                    ['Рейтинг', '⭐ ' + course.rating + '/5'],
                  ].map(([l, v]) => (
                    <div key={l as string} className="flex justify-between">
                      <span className="text-gray-400">{l}</span>
                      <span className="text-white font-medium">{v}</span>
                    </div>
                  ))}
                </div>

                <Link href="/enrollment" className="block">
                  <Button variant="primary" size="lg" className="w-full">🎓 Записаться</Button>
                </Link>
                <p className="text-center text-xs text-gray-500 mt-4">Пробное занятие — бесплатно!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
