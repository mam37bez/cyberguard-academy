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
    course.fullDescription || course.description || `Курс ${course.title} в CyberGuard Academy.`;

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

function getCourseAudience(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Детям 6–9 лет, которые только начинают знакомство с цифровой безопасностью.',
      'Родителям, которые хотят мягко и безопасно ввести ребёнка в тему поведения в интернете.',
      'Тем, кому нужен понятный и игровой формат обучения без перегрузки сложными терминами.',
    ],
    'cybersecurity-explorer': [
      'Подросткам 10–14 лет, которым интересны технологии, интернет и цифровая защита.',
      'Тем, кто хочет лучше понимать фишинг, сети, безопасность аккаунтов и основы Python.',
      'Семьям, которые хотят развивать у ребёнка цифровую грамотность и внимательность к рискам.',
    ],
    'cybersecurity-pro': [
      'Подросткам 14–17 лет, которые хотят глубже погрузиться в кибербезопасность.',
      'Тем, кто рассматривает информационную безопасность как серьёзное направление развития.',
      'Ученикам, которым интересно системно изучать веб-безопасность, сети и анализ угроз.',
    ],
    'cybersecurity-parents': [
      'Родителям, которые хотят лучше понимать цифровые риски для семьи.',
      'Тем, кто хочет научиться распознавать мошенничество и защищать детей в интернете.',
      'Семьям, которым нужен понятный практический курс без сложной технической нагрузки.',
    ],
  };

  return map[courseSlug] || [];
}

function getCourseBenefits(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Понимание базовых правил безопасного поведения в интернете.',
      'Навык распознавания простых обманных сценариев и подозрительных сообщений.',
      'Умение создавать более надёжные пароли и бережно относиться к личной информации.',
    ],
    'cybersecurity-explorer': [
      'Лучшее понимание цифровых угроз, фишинга, сетей и безопасного поведения в интернете.',
      'Базовые навыки анализа, цифровой внимательности и осознанного отношения к технологиям.',
      'Более уверенное понимание того, как защищать аккаунты, устройства и данные.',
    ],
    'cybersecurity-pro': [
      'Системное понимание ключевых направлений современной кибербезопасности.',
      'Навыки анализа угроз, понимание веб-безопасности, сетей и инцидентного мышления.',
      'Более сильную базу для дальнейшего развития в техническом и профессиональном направлении.',
    ],
    'cybersecurity-parents': [
      'Понимание основных цифровых рисков для семьи и детей.',
      'Навык распознавания мошенничества, подозрительных звонков и фишинга.',
      'Практические ориентиры по защите устройств, аккаунтов и домашней цифровой среды.',
    ],
  };

  return map[courseSlug] || [];
}

function getCourseOutcomes(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Ребёнок начинает лучше понимать, что можно и нельзя делать в интернете.',
      'Формируются первые привычки цифровой осторожности и защиты личной информации.',
      'Появляется понятная база для дальнейшего обучения цифровой грамотности.',
    ],
    'cybersecurity-explorer': [
      'Подросток лучше ориентируется в цифровых рисках и онлайн-коммуникации.',
      'Появляется более зрелое отношение к паролям, ссылкам, аккаунтам и устройствам.',
      'Формируется уверенная практическая база для дальнейшего развития в теме безопасности.',
    ],
    'cybersecurity-pro': [
      'Ученик получает более глубокое понимание структуры и логики кибербезопасности.',
      'Укрепляется аналитическое мышление и понимание защитных подходов.',
      'Появляется хороший фундамент для дальнейшего профильного обучения и саморазвития.',
    ],
    'cybersecurity-parents': [
      'Родители получают более спокойное и осознанное понимание семейной цифровой безопасности.',
      'Появляется понятный план защиты детей, устройств и аккаунтов.',
      'Снижается уязвимость семьи к базовым мошенническим и фишинговым сценариям.',
    ],
  };

  return map[courseSlug] || [];
}

function getCourseFaq(courseSlug: string) {
  const map: Record<string, { question: string; answer: string }[]> = {
    'cybersecurity-junior': [
      {
        question: 'Подойдёт ли курс ребёнку без технической подготовки?',
        answer:
          'Да. Этот курс рассчитан на новичков и объясняет цифровую безопасность в понятной и доступной форме.',
      },
      {
        question: 'Не будет ли ребёнку слишком сложно?',
        answer:
          'Программа адаптирована под возраст и строится на понятных примерах, базовых правилах и практических навыках.',
      },
      {
        question: 'Что является главным результатом курса?',
        answer:
          'Формирование первых безопасных привычек в интернете, понимание паролей, приватности и базовых рисков.',
      },
    ],
    'cybersecurity-explorer': [
      {
        question: 'Нужны ли знания программирования?',
        answer:
          'Нет. Базовая техническая подготовка не обязательна. Главное — интерес к технологиям и готовность учиться.',
      },
      {
        question: 'Подойдёт ли курс ребёнку, который уже много времени проводит в интернете?',
        answer:
          'Да, это как раз одна из сильных сторон курса: он помогает лучше понимать реальные цифровые риски и защиту.',
      },
      {
        question: 'Что даёт курс кроме теории?',
        answer:
          'Он помогает выработать более зрелое и осознанное отношение к аккаунтам, устройствам, сетям и цифровой безопасности.',
      },
    ],
    'cybersecurity-pro': [
      {
        question: 'Подойдёт ли курс тем, кто хочет развиваться в IT и безопасности?',
        answer:
          'Да. Это одна из самых сильных программ для тех, кто хочет глубже понимать кибербезопасность и смежные направления.',
      },
      {
        question: 'Это уже серьёзный уровень?',
        answer:
          'Да, курс рассчитан на более глубокое погружение и подойдёт мотивированным подросткам, которым интересны технологии и защита.',
      },
      {
        question: 'Что является основным результатом?',
        answer:
          'Сильная база по современным темам кибербезопасности и более зрелое понимание защитных подходов и цифровых угроз.',
      },
    ],
    'cybersecurity-parents': [
      {
        question: 'Подойдёт ли курс родителям без технического опыта?',
        answer:
          'Да. Программа построена на понятных примерах и ориентирована на практическую защиту семьи.',
      },
      {
        question: 'Будут ли даны конкретные советы для семьи?',
        answer:
          'Да. Курс ориентирован на реальные бытовые риски: мошенничество, защита устройств, приватность и безопасность детей.',
      },
      {
        question: 'Что даёт курс в итоге?',
        answer:
          'Более уверенное понимание цифровых рисков и практический ориентир для защиты семьи и ребёнка в интернете.',
      },
    ],
  };

  return map[courseSlug] || [];
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const courseUrl = `https://cyberguard-academy.vercel.app/courses/${course.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.fullDescription || course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'CyberGuard Academy',
      url: 'https://cyberguard-academy.vercel.app',
    },
    educationalLevel: course.level,
    timeRequired: course.duration,
    courseMode: 'online and onsite',
    inLanguage: 'ru',
    instructor: {
      '@type': 'Person',
      name: course.instructor.name,
      description: course.instructor.title,
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency,
      availability: course.enrollmentOpen
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: courseUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      reviewCount: course.reviewCount,
    },
    url: courseUrl,
  };

  const audience = getCourseAudience(course.slug);
  const benefits = getCourseBenefits(course.slug);
  const outcomes = getCourseOutcomes(course.slug);
  const faq = getCourseFaq(course.slug);

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4">
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">
            Главная
          </Link>{' '}
          /{' '}
          <Link href="/courses" className="hover:text-white">
            Курсы
          </Link>{' '}
          / <span className="text-white">{course.title}</span>
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
                <h2 className="text-xl font-bold text-white mb-4">Темы курса</h2>
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
                <h2 className="text-xl font-bold text-white mb-4">Кому подходит курс</h2>
                <ul className="space-y-3">
                  {audience.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-primary-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-4">Что получит ученик</h2>
                <ul className="space-y-3">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-cyber-green">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-6">Программа</h2>
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
                            <span>{m.lessons} уроков</span>
                            <span>{m.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-4">Результаты обучения</h2>
                <ul className="space-y-3">
                  {outcomes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-cyber-green">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-4">Частые вопросы по курсу</h2>
                <div className="space-y-4">
                  {faq.map((item, i) => (
                    <div key={i} className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-4">
                      <h3 className="font-semibold text-white mb-2">{item.question}</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="sticky top-28 h-fit">
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
                    ['Рейтинг', `${course.rating}/5`],
                  ].map(([label, value]) => (
                    <div key={label as string} className="flex justify-between gap-4">
                      <span className="text-gray-400">{label}</span>
                      <span className="text-white font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <Link href="/enrollment" className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Записаться
                  </Button>
                </Link>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Пробное занятие — бесплатно!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
