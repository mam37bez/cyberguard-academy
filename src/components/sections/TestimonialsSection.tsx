'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { testimonials } from '@/data/security';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section className="bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-20" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading dense badge="Отзывы" title="Что говорят ученики" subtitle="Реальные отзывы" />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 transition-all duration-700 motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'
          }`}
        >
          {testimonials.map((t) => (
            <Card key={t.id} variant="default">
              <CardContent>
                <div className="flex gap-0.5 mb-4" aria-label={`Оценка ${t.rating} из 5`}>
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

                <p className="text-slate-400 text-sm mb-6 leading-relaxed italic">&ldquo;{t.content}&rdquo;</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white font-semibold text-sm ring-1 ring-white/10">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{t.name}</div>
                    <div className="text-slate-600 text-xs">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
