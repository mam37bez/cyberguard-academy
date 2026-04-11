import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'FAQ — вопросы и ответы о курсах CyberGuard Academy',
  description:
    'Ответы на частые вопросы о курсах CyberGuard Academy: возраст, формат обучения, запись, пробное занятие и программа обучения.',
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

const faqItems = [
  {
    question: 'Для кого подходят курсы CyberGuard Academy?',
    answer:
      'Курсы подходят для детей, подростков и родителей. На сайте есть программы для разных возрастов и уровней подготовки: от базовой цифровой безопасности до более продвинутых тем.',
  },
  {
    question: 'Нужна ли специальная подготовка перед началом обучения?',
    answer:
      'Для большинства базовых программ специальная подготовка не требуется. В описании каждого курса указаны возраст, уровень и примерное содержание программы.',
  },
  {
    question: 'Как записаться на курс?',
    answer:
      'Вы можете открыть страницу записи, выбрать подходящую программу и заполнить форму. После этого мы связываемся с вами для уточнения деталей.',
  },
  {
    question: 'Есть ли пробное занятие?',
    answer:
      'Да, на сайте указано, что пробное занятие предоставляется бесплатно. Это помогает понять формат обучения и выбрать подходящий курс.',
  },
  {
    question: 'Чему именно учат на курсах?',
    answer:
      'Программы включают темы цифровой безопасности, паролей, фишинга, защиты аккаунтов, безопасности устройств, приватности, распознавания мошенничества и других актуальных рисков.',
  },
  {
    question: 'Это обучение защите или хакингу?',
    answer:
      'Подход CyberGuard Academy — White Hat Education. Мы учим защищать аккаунты, устройства, данные и правильно понимать угрозы, а не романтизируем атакующие практики.',
  },
  {
    question: 'Можно ли родителям тоже проходить обучение?',
    answer:
      'Да, для родителей предусмотрены отдельные материалы и курсы, связанные с защитой детей, семейной цифровой безопасностью и распознаванием мошенничества.',
  },
  {
    question: 'Как понять, какой курс выбрать?',
    answer:
      'Посмотрите страницу курсов: там указаны возраст, длительность, формат, навыки и программа. Если остаются вопросы, можно написать через форму контактов.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="FAQ"
          title="Частые вопросы"
          subtitle="Ответы о курсах, записи, формате обучения и подходе CyberGuard Academy"
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/90 p-6"
            >
              <h2 className="text-lg font-semibold text-white mb-3 tracking-tight">{item.question}</h2>
              <p className="text-slate-400 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
