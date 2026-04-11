'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { courses } from '@/data/courses';
import { formatPrice } from '@/lib/utils';
import { FadeInWhenVisible, useHomeStagger } from '@/components/sections/HomeMotion';

export function CoursesSection() {
  const { container, item } = useHomeStagger();

  const levelLabels: Record<string, string> = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  const levelColors: Record<string, 'success' | 'warning' | 'danger'> = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger',
  };

  return (
    <Section className="relative overflow-hidden bg-cyber-dark">
      <div className="absolute inset-0 bg-glow-gradient opacity-40" aria-hidden />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="Наши программы"
            title="Курсы кибербезопасности"
            subtitle="Программы для детей, подростков и родителей"
          />
        </FadeInWhenVisible>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -8% 0px' }}
        >
          {courses.map((c) => (
            <motion.div key={c.id} variants={item}>
              <Card variant="gradient" className="flex h-full flex-col border-white/[0.06] transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none">
                <CardContent>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="text-4xl">{c.icon}</div>
                    <Badge variant={levelColors[c.level]}>{levelLabels[c.level]}</Badge>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{c.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">{c.description}</p>

                  <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="text-slate-500">
                      <span className="font-medium text-slate-300">Возраст:</span> {c.ageGroup}
                    </div>
                    <div className="text-slate-500">
                      <span className="font-medium text-slate-300">Длительность:</span> {c.duration}
                    </div>
                    <div className="text-slate-500">
                      <span className="font-medium text-slate-300">Рейтинг:</span> {c.rating}/5
                    </div>
                    <div className="text-slate-500">
                      <span className="font-medium text-slate-300">Мест:</span> {c.currentStudents}/{c.maxStudents}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {c.skills.slice(0, 3).map((s) => (
                      <Badge key={s} variant="outline" size="sm">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto flex items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl font-semibold tabular-nums text-white">{formatPrice(c.price)}</span>
                    <span className="text-sm text-slate-600">/мес</span>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2">
                    <ButtonLink href={`/courses/${c.slug}`} variant="ghost" size="sm">
                      Подробнее
                    </ButtonLink>
                    <ButtonLink href="/enrollment" variant="primary" size="sm">
                      Записаться
                    </ButtonLink>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
