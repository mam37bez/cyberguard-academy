import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

const faqItems = [
  {
    question: 'Для кого подходят курсы CyberGuard Academy?',
    answer:
      'Курсы подходят для детей, подростков и родителей. На сайте есть программы для разных возрастов и уровней подготовки.',
  },
  {
    question: 'Нужна ли предварительная подготовка?',
    answer:
      'Для большинства базовых программ специальная подготовка не требуется. В описании каждого курса указаны возраст и уровень.',
  },
  {
    question: 'Есть ли пробное занятие?',
    answer:
      'Да, пробное занятие предоставляется бесплатно. Это помогает понять формат обучения и выбрать подходящую программу.',
  },
  {
    question: 'Как записаться на курс?',
    answer:
      'Откройте страницу записи, выберите курс и заполните форму. После этого мы связываемся с вами для уточнения деталей.',
  },
];

export function FAQSection() {
  return (
    <Section className="bg-cyber-darker">
      <Container>
        <SectionHeading
          dense
          badge="FAQ"
          title="Частые вопросы"
          subtitle="Краткие ответы на самые важные вопросы об обучении"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 md:p-7"
            >
              <h3 className="text-base font-semibold text-white mb-3 leading-snug tracking-tight">{item.question}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <ButtonLink href="/faq" variant="outline" size="lg">
            Смотреть все вопросы
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
