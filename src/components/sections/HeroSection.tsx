'use client';

import React from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/layout/Container';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-darker">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 motion-reduce:opacity-10" />
        <div className="absolute inset-0 bg-glow-gradient opacity-90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl animate-pulse-slow motion-reduce:animate-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-blue/5 blur-3xl animate-pulse-slow motion-reduce:animate-none" />
      </div>

      <Container className="relative z-10 py-28 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90" aria-hidden />
            White Hat Education — набор 2026
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary-500/15 to-cyber-blue/10 border border-white/10 text-5xl sm:text-6xl shadow-inner motion-safe:animate-shield-pulse motion-reduce:animate-none">
              🛡️
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              CyberGuard
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-300 via-cyber-blue to-primary-400 bg-clip-text text-transparent">
              Academy
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Образовательная платформа по кибербезопасности.
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            Учим <span className="text-emerald-400/95 font-medium">защищать</span>, а не атаковать.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <ButtonLink href="/courses" size="lg" variant="primary">
              Выбрать курс
            </ButtonLink>
            <ButtonLink href="/security-tools" size="lg" variant="secondary">
              Проверить безопасность
            </ButtonLink>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-4 border-t border-white/[0.06]">
            {[
              { v: '4', l: 'Программы' },
              { v: '160+', l: 'Учебных часов' },
              { v: '4', l: 'Направления' },
              { v: '100%', l: 'Фокус на защите' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-primary-200 to-cyber-blue bg-clip-text text-transparent mb-1">
                  {s.v}
                </div>
                <div className="text-xs sm:text-sm text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
