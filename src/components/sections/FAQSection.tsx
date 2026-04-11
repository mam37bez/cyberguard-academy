'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeInWhenVisible, useHomeStagger } from '@/components/sections/HomeMotion';

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
  const { container, item } = useHomeStagger();

  return (
    <Section className="bg-cyber-darker">
      <Container>
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="FAQ"
            title="Частые вопросы"
            subtitle="Краткие ответы на самые важные вопросы об обучении"
          />
        </FadeInWhenVisible>

        <motion.div
          className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        >
          {faqItems.map((q) => (
            <motion.div
              key={q.question}
              variants={item}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/25 md:p-7 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <h3 className="mb-3 text-base font-semibold leading-snug tracking-tight text-white">{q.question}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{q.answer}</p>
            </motion.div>
          ))}
        </motion.div>

        <FadeInWhenVisible className="text-center" delay={0.06}>
          <ButtonLink href="/faq" variant="outline" size="lg">
            Смотреть все вопросы
          </ButtonLink>
        </FadeInWhenVisible>
      </Container>
    </Section>
  );
}
