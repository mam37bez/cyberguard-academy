'use client';

import React from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FadeInWhenVisible } from '@/components/sections/HomeMotion';

export function CTASection() {
  return (
    <Section className="relative overflow-hidden border-t border-white/[0.06]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-950/80 via-cyber-darker to-cyber-dark"
        aria-hidden
      />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.12]" aria-hidden />

      <Container className="relative z-10 max-w-3xl text-center">
        <FadeInWhenVisible>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-300/80">Старт</p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">Готовы начать?</h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
            Запишитесь на пробное занятие — это бесплатно.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/enrollment" size="lg" variant="primary">
              Пробное занятие
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              Задать вопрос
            </ButtonLink>
          </div>
        </FadeInWhenVisible>
      </Container>
    </Section>
  );
}
