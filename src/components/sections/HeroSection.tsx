'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-darker">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <div className="absolute inset-0 bg-glow-gradient" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-green/5 blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            White Hat Education — Набор 2026
          </div>

          <div className="mb-8 animate-float">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500/20 to-cyber-green/20 border border-primary-500/30 text-6xl animate-shield-pulse">
              🛡️
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
              CyberGuard
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyber-green via-cyber-blue to-primary-400 bg-clip-text text-transparent">
              Academy
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 animate-slide-up">
            Образовательная платформа по кибербезопасности.
            <br className="hidden sm:block" />
            Учим <span className="text-cyber-green font-semibold">защищать</span>, а не атаковать.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link href="/courses">
              <Button size="lg" variant="primary">
                Выбрать курс
              </Button>
            </Link>
            <Link href="/security-tools">
              <Button size="lg" variant="secondary">
                Проверить безопасность
              </Button>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
            {[
              { v: '4', l: 'Программы' },
              { v: '160+', l: 'Учебных часов' },
              { v: '4', l: 'Направления' },
              { v: '100%', l: 'Фокус на защите' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent mb-1">
                  {s.v}
                </div>
                <div className="text-sm text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
