import React from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export function CTASection() {
  return (
    <Section className="relative overflow-hidden border-t border-white/[0.06]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-950/80 via-cyber-darker to-cyber-dark"
        aria-hidden
      />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.12]" aria-hidden />

      <Container className="relative z-10 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-300/80 mb-4">Старт</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">Готовы начать?</h2>
        <p className="text-base md:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Запишитесь на пробное занятие — это бесплатно.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <ButtonLink href="/enrollment" size="lg" variant="primary">
            Пробное занятие
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline">
            Задать вопрос
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
