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
    title: 'Мы получаем заявку',
    description:
      'После отправки формы заявка попадает к нам, и мы видим выбранный филиал, курс и ваши контактные данные.',
  },
  {
    step: '02',
    title: 'Связываемся с вами',
    description:
      'Обычно мы отвечаем в течение 24 часов, чтобы уточнить детали, ответить на вопросы и помочь с выбором программы.',
  },
  {
    step: '03',
    title: 'Подбираем следующий шаг',
    description:
      'Вместе определяем, подходит ли курс, как лучше стартовать и нужен ли сначала формат пробного занятия.',
  },
  {
    step: '04',
    title: 'Помогаем начать обучение',
    description:
      'После согласования деталей вы получаете понятный путь к старту: от организационных шагов до начала обучения.',
  },
];

export function AfterSubmissionSection() {
  const { container, item } = useHomeStagger();

  return (
    <Section className="relative overflow-hidden bg-cyber-darker">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="После заявки"
            title="Что происходит после отправки формы"
            subtitle="Мы стараемся сделать путь от заявки до старта обучения максимально понятным и спокойным"
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
