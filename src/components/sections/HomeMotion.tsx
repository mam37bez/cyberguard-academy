'use client';

import type { Variants } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const defaultViewport = { once: true, amount: 0.12 as const, margin: '0px 0px -10% 0px' as const };

/** Лёгкое появление блока при скролле; при prefers-reduced-motion — без анимации. */
export function FadeInWhenVisible({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={
        reduce ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }
      }
    >
      {children}
    </motion.div>
  );
}

/** Варианты для сетки карточек с лёгким stagger. */
export function useHomeStagger(): { container: Variants; item: Variants } {
  const reduce = useReducedMotion();
  if (reduce) {
    return {
      container: { hidden: {}, visible: {} },
      item: {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      },
    };
  }
  return {
    container: {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 18 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.48, ease: EASE },
      },
    },
  };
}
