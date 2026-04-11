import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

const steps = [
  {
    step: '01',
    title: 'Знакомство и короткая консультация',
    description:
      'Мы уточняем возраст, интересы, цели и помогаем понять, какая программа подойдёт лучше всего.',
  },
  {
    step: '02',
    title: 'Погружение в формат занятия',
    description:
      'На пробной встрече можно увидеть, как подаётся материал, какой темп используется и насколько комфортен формат.',
  },
  {
    step: '03',
    title: 'Понимание интереса и уровня',
    description:
      'Пробное занятие помогает понять, насколько ученику близка тема и подходит ли программа по сложности и подаче.',
  },
  {
    step: '04',
    title: 'Решение о старте обучения',
    description:
      'После занятия становится проще принять решение о записи и выбрать дальнейший маршрут обучения.',
  },
];

export function TrialLessonSection() {
  return (
    <Section className="bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          dense
          badge="Пробное занятие"
          title="Как проходит пробное занятие"
          subtitle="Простой и понятный формат знакомства с программой, чтобы ученик и родители могли спокойно понять, подходит ли курс"
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
