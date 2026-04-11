'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeInWhenVisible, useHomeStagger } from '@/components/sections/HomeMotion';

const benefits = [
  {
    icon: '🔐',
    title: 'Навыки цифровой безопасности',
    description:
      'Ученик начинает лучше понимать, как защищать аккаунты, устройства и личные данные в интернете.',
  },
  {
    icon: '🧠',
    title: 'Критическое мышление',
    description:
      'Формируется привычка замечать подозрительные сообщения, ссылки, просьбы и цифровые риски до того, как они приведут к проблеме.',
  },
  {
    icon: '🛡️',
    title: 'Больше уверенности в интернете',
    description:
      'Ребёнок или подросток чувствует себя спокойнее в цифровой среде и лучше понимает, как действовать безопасно.',
  },
  {
    icon: '🚀',
    title: 'Полезная база на будущее',
    description:
      'Обучение формирует важные привычки и знания, которые пригодятся и в повседневной жизни, и в дальнейшем развитии.',
  },
];

export function StudentBenefitsSection() {
  const { container, item } = useHomeStagger();

  return (
    <Section className="bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="Что получает ученик"
            title="Полезный результат уже в процессе обучения"
            subtitle="Мы делаем акцент не только на знаниях, но и на практических привычках, внимательности и уверенности в цифровой среде"
          />
        </FadeInWhenVisible>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={item}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/30 hover:shadow-lg hover:shadow-black/20 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
