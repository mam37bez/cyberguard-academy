'use client';

import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/layout/Container';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yBlobTop = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -64]);
  const yBlobBottom = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 96]);
  const yMesh = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 36]);
  const yGrid = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 18]);
  const scaleGlow = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.04]);

  const container = reduce
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
      };

  const item = reduce
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } },
      };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cyber-darker"
    >
      <div className="absolute inset-0" aria-hidden>
        {/* Базовая сетка — лёгкий parallax только при motion-safe (через useTransform → 0 при reduce) */}
        <motion.div
          className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 motion-reduce:opacity-10 motion-safe:will-change-transform"
          style={{ y: yGrid }}
        />

        <div className="absolute inset-0 bg-glow-gradient opacity-90" />

        {/* Слой 2: статичный «меш» — без скролл-анимации, одинаково комфортен при reduced-motion */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.42] mix-blend-soft-light motion-reduce:opacity-[0.32]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 95% 65% at 12% 8%, rgba(99, 102, 241, 0.2), transparent 58%),
              radial-gradient(ellipse 75% 55% at 88% 92%, rgba(34, 211, 238, 0.14), transparent 52%),
              radial-gradient(ellipse 55% 45% at 52% 48%, rgba(79, 70, 229, 0.12), transparent 62%)
            `,
          }}
        />

        {/* Тот же меш — копия с очень лёгким parallax поверх (движение ≈0 при reduce) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-screen motion-safe:will-change-transform motion-reduce:opacity-[0.18]"
          style={{
            y: yMesh,
            scale: scaleGlow,
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 70% 15%, rgba(129, 140, 248, 0.25), transparent 50%),
              radial-gradient(ellipse 60% 45% at 20% 85%, rgba(45, 212, 191, 0.12), transparent 48%)
            `,
          }}
        />

        <motion.div
          className="absolute left-1/4 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary-500/5 blur-3xl motion-safe:animate-pulse-slow motion-safe:will-change-transform motion-reduce:animate-none sm:h-96 sm:w-96"
          style={{ y: yBlobTop }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[28rem] w-[28rem] rounded-full bg-cyber-blue/5 blur-3xl motion-safe:animate-pulse-slow motion-safe:will-change-transform motion-reduce:animate-none sm:h-96 sm:w-96"
          style={{ y: yBlobBottom }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyber-darker via-cyber-darker/80 to-transparent" />
      </div>

      <Container className="relative z-10 py-28 sm:py-32">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={item}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" aria-hidden />
            White Hat Education — набор 2026
          </motion.div>

          <motion.div variants={item} className="mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary-500/15 to-cyber-blue/10 text-5xl shadow-inner motion-safe:animate-shield-pulse motion-reduce:animate-none sm:h-24 sm:w-24 sm:text-6xl">
              🛡️
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="mb-6 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              CyberGuard
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-300 via-cyber-blue to-primary-400 bg-clip-text text-transparent">
              Academy
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          >
            Образовательная платформа по кибербезопасности.
            <span className="hidden sm:inline">
              <br />
            </span>{' '}
            Учим <span className="font-medium text-emerald-400/95">защищать</span>, а не атаковать.
          </motion.p>

          <motion.div
            variants={item}
            className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
          >
            <ButtonLink href="/courses" size="lg" variant="primary" className="sm:min-w-[11rem]">
              Выбрать курс
            </ButtonLink>
            <ButtonLink href="/security-tools" size="lg" variant="secondary" className="sm:min-w-[11rem]">
              Проверить безопасность
            </ButtonLink>
            <ButtonLink href="/quiz" size="lg" variant="outline" className="sm:min-w-[11rem]">
              Бесплатные квизы
            </ButtonLink>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-4 sm:mt-20 sm:gap-8 md:grid-cols-4"
          >
            {[
              { v: '4', l: 'Программы' },
              { v: '160+', l: 'Учебных часов' },
              { v: '4', l: 'Направления' },
              { v: '100%', l: 'Фокус на защите' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="mb-1 bg-gradient-to-r from-primary-200 to-cyber-blue bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl md:text-4xl">
                  {s.v}
                </div>
                <div className="text-xs text-slate-500 sm:text-sm">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
