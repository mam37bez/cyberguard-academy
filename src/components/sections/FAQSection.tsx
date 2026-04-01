import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

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
    <section className="py-24 bg-cyber-darker">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="FAQ"
          title="Частые вопросы"
          subtitle="Краткие ответы на самые важные вопросы об обучении"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-cyber-border bg-cyber-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/faq">
            <Button variant="outline" size="lg">
              Смотреть все вопросы
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
