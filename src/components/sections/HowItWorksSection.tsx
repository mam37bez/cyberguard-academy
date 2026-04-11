import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

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
    <Section className="bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          dense
          badge="Как проходит обучение"
          title="Понятный путь от заявки до старта"
          subtitle="Мы стараемся сделать процесс записи и начала обучения простым, прозрачным и удобным"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-black/20 motion-reduce:transition-none"
            >
              <div className="text-xs font-mono text-primary-300/90 mb-3 tracking-wider">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
