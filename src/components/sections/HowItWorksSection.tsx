import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Выбираете направление',
    description:
      'Смотрите программы, возрастные группы, темы обучения и выбираете курс, который лучше всего подходит ребёнку, подростку или семье.',
  },
  {
    step: '02',
    title: 'Оставляете заявку',
    description:
      'Заполняете форму записи или пишете через страницу контактов, чтобы мы могли связаться с вами и уточнить детали.',
  },
  {
    step: '03',
    title: 'Получаете консультацию',
    description:
      'Мы помогаем подобрать программу, отвечаем на вопросы и согласовываем удобный формат старта обучения.',
  },
  {
    step: '04',
    title: 'Начинаете обучение',
    description:
      'Ученик получает понятную, практическую и безопасную программу обучения, ориентированную на реальные цифровые риски и навыки защиты.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-cyber-darker relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-20" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Как проходит обучение"
          title="Понятный путь от заявки до старта"
          subtitle="Мы стараемся сделать процесс записи и начала обучения простым, прозрачным и удобным"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className="text-sm font-mono text-cyber-green mb-3">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
