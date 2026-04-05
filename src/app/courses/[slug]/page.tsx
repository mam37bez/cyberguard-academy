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

function getWhyNow(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Дети начинают пользоваться интернетом всё раньше, и безопасные привычки лучше формировать с самого начала.',
      'Чем раньше ребёнок учится осторожности в сети, тем легче ему избегать простых ошибок и обманных сценариев.',
      'Базовая цифровая безопасность сегодня — это такой же важный навык, как внимательность и ответственное поведение в обычной жизни.',
    ],
    'cybersecurity-explorer': [
      'Подростки всё активнее используют интернет, мессенджеры, соцсети и цифровые сервисы, а значит сталкиваются с реальными рисками уже сейчас.',
      'На этом этапе особенно важно не просто запрещать, а учить понимать угрозы, распознавать фишинг и осознанно относиться к аккаунтам и устройствам.',
      'Чем раньше появляется системное понимание цифровой безопасности, тем увереннее ребёнок чувствует себя в интернете.',
    ],
    'cybersecurity-pro': [
      'Современный цифровой мир требует не только интереса к технологиям, но и понимания реальных угроз и защитных подходов.',
      'Если ученик уже задумывается о развитии в IT, сейчас самое время строить сильную базу в области кибербезопасности.',
      'Ранний старт даёт больше времени на развитие аналитического мышления, технической базы и осознанного отношения к цифровым рискам.',
    ],
    'cybersecurity-parents': [
      'Мошенничество, фишинг и цифровые риски меняются быстро, и откладывать понимание этих тем уже не стоит.',
      'Родителям важно не только реагировать на проблемы, но и заранее выстраивать безопасную цифровую среду для семьи.',
      'Чем раньше семья получает понятные правила и практические ориентиры, тем проще снизить риски в повседневной жизни.',
    ],
  };

  return map[courseSlug] || [];
}

function getCourseFormat(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Занятия проходят в понятном и мягком формате с акцентом на базовые привычки цифровой безопасности.',
      'Материал объясняется доступным языком, с примерами и сценариями, близкими детям этого возраста.',
      'Программа строится постепенно, чтобы ребёнок уверенно осваивал тему без перегрузки.',
    ],
    'cybersecurity-explorer': [
      'Обучение сочетает теорию, практические примеры и развитие цифровой внимательности.',
      'Формат ориентирован на подростковый интерес к технологиям и помогает удерживать внимание на полезных навыках.',
      'Программа выстроена так, чтобы шаг за шагом дать системное понимание рисков и способов защиты.',
    ],
    'cybersecurity-pro': [
      'Курс проходит в более глубоком и системном формате с фокусом на современные направления кибербезопасности.',
      'Материалы помогают не просто узнавать новые термины, а выстраивать структуру понимания защитных подходов.',
      'Формат подходит мотивированным ученикам, которым важен серьёзный уровень погружения.',
    ],
    'cybersecurity-parents': [
      'Обучение ориентировано на практическую пользу для семьи и повседневной жизни.',
      'Материал объясняется понятным языком без излишней технической перегрузки.',
      'Формат помогает быстро применять знания на практике: в настройках, семейных правилах и защите устройств.',
    ],
  };

  return map[courseSlug] || [];
}

function getTrialLessonFlow(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Сначала мы знакомимся с ребёнком, его интересами и уровнем цифрового опыта.',
      'Потом показываем понятный фрагмент занятия в доступной и спокойной форме.',
      'В конце родители получают представление о формате и понимают, подходит ли программа ребёнку.',
    ],
    'cybersecurity-explorer': [
      'Пробное занятие помогает понять, насколько подростку интересен формат и темы курса.',
      'Мы показываем примеры задач, обсуждаем цифровые риски и смотрим, как ученик включается в материал.',
      'После занятия становится понятнее, подходит ли программа по уровню и интересу.',
    ],
    'cybersecurity-pro': [
      'Пробное занятие помогает оценить мотивацию ученика и глубину его интереса к теме.',
      'Мы показываем формат работы, примеры тем и уровень подхода без перегрузки в первый контакт.',
      'После встречи проще понять, насколько программа соответствует ожиданиям и целям.',
    ],
    'cybersecurity-parents': [
      'Пробная встреча помогает родителям увидеть формат подачи материала и практическую направленность курса.',
      'Мы обсуждаем реальные семейные риски, примеры ситуаций и то, как знания будут применяться в жизни.',
      'После занятия становится легче понять, насколько программа полезна именно вашей семье.',
    ],
  };

  return map[courseSlug] || [];
}

function getWhatNeededToStart(courseSlug: string) {
  const map: Record<string, string[]> = {
    'cybersecurity-junior': [
      'Специальная техническая подготовка не требуется.',
      'Важно только базовое знакомство ребёнка с устройствами и готовность учиться в спокойном темпе.',
      'Для старта полезны интерес к теме, внимание и поддержка родителей.',
    ],
    'cybersecurity-explorer': [
      'Предварительные глубокие технические знания не обязательны.',
      'Желательны интерес к технологиям, интернету и готовность включаться в практические задания.',
      'Для хорошего старта достаточно мотивации и желания лучше понимать цифровую безопасность.',
    ],
    'cybersecurity-pro': [
      'Для старта важны интерес к технологиям и готовность к более серьёзному уровню погружения.',
      'Опыт программирования может быть полезен, но не является единственным условием.',
      'Главное — мотивация, внимательность и желание системно изучать кибербезопасность.',
    ],
    'cybersecurity-parents': [
      'Технический опыт не обязателен.',
      'Для старта достаточно желания лучше понимать цифровые риски и выстраивать безопасность семьи.',
      'Курс рассчитан на практическое применение, а не на сложную техническую теорию.',
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
  const whyNow = getWhyNow(course.slug);
  const format = getCourseFormat(course.slug);
  const trialFlow = getTrialLessonFlow(course.slug);
  const startNeeds = getWhatNeededToStart(course.slug);

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
                <h2 className="text-xl font-bold text-white mb-4">О преподавателе</h2>
                <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {course.instructor.name}
                  </h3>
                  <p className="text-primary-400 text-sm mb-3">{course.instructor.title}</p>
                  <p className="text-gray-300 leading-relaxed mb-4">{course.instructor.bio}</p>

                  {course.instructor.certifications.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Сертификации</div>
                      <div className="flex flex-wrap gap-2">
                        {course.instructor.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="rounded-full border border-cyber-border bg-cyber-card px-3 py-1 text-xs text-gray-300"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-4">Формат обучения</h2>
                <ul className="space-y-3">
                  {format.map((item, i) => (
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
                <h2 className="text-xl font-bold text-white mb-4">Как проходит пробное занятие</h2>
                <ul className="space-y-3">
                  {trialFlow.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-yellow-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-4">Что нужно для старта</h2>
                <ul className="space-y-3">
                  {startNeeds.map((item, i) => (
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
                <h2 className="text-xl font-bold text-white mb-4">Почему стоит начать сейчас</h2>
                <ul className="space-y-3">
                  {whyNow.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-yellow-400">•</span>
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
