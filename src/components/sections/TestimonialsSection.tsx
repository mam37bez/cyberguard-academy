'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { testimonials } from '@/data/security';
import { FadeInWhenVisible, useHomeStagger } from '@/components/sections/HomeMotion';

export function TestimonialsSection() {
  const { container, item } = useHomeStagger();

  return (
    <Section className="relative overflow-hidden bg-cyber-dark">
      <div className="absolute inset-0 bg-glow-gradient opacity-20" aria-hidden />

      <Container className="relative z-10">
        <FadeInWhenVisible>
          <SectionHeading dense badge="Отзывы" title="Что говорят ученики" subtitle="Реальные отзывы" />
        </FadeInWhenVisible>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.id} variants={item}>
              <Card variant="default" className="h-full border-white/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/25 motion-reduce:transform-none">
                <CardContent>
                  <div className="mb-4 flex gap-0.5" aria-label={`Оценка ${t.rating} из 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < t.rating ? 'text-amber-400/90' : 'text-slate-700'}
                        aria-hidden
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="mb-6 text-sm italic leading-relaxed text-slate-400">&ldquo;{t.content}&rdquo;</p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-500 text-sm font-semibold text-white ring-1 ring-white/10">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{t.name}</div>
                      <div className="text-xs text-slate-600">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
