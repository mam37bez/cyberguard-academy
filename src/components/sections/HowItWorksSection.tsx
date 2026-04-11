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
  const { container, item } = useHomeStagger();

  return (
    <Section className="relative overflow-hidden bg-cyber-darker">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="Как проходит обучение"
            title="Понятный путь от заявки до старта"
            subtitle="Мы стараемся сделать процесс записи и начала обучения простым, прозрачным и удобным"
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
