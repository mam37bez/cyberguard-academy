'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeInWhenVisible, useHomeStagger } from '@/components/sections/HomeMotion';

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
  const { container, item } = useHomeStagger();

  return (
    <Section className="relative overflow-hidden bg-cyber-dark">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="Пробное занятие"
            title="Как проходит пробное занятие"
            subtitle="Простой и понятный формат знакомства с программой, чтобы ученик и родители могли спокойно понять, подходит ли курс"
          />
        </FadeInWhenVisible>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.step}
              variants={item}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/30 hover:shadow-lg hover:shadow-black/20 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="mb-3 font-mono text-xs tracking-wider text-primary-300/90">{s.step}</div>
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
