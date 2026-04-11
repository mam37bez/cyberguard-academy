'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { courses } from '@/data/courses';
import { formatPrice } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function CoursesSection() {
  const { ref, isVisible } = useScrollAnimation();

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
    <Section className="bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-40" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          dense
          badge="Наши программы"
          title="Курсы кибербезопасности"
          subtitle="Программы для детей, подростков и родителей"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 transition-all duration-700 motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'
          }`}
        >
          {courses.map((c) => (
            <Card key={c.id} variant="gradient" className="flex flex-col">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{c.icon}</div>
                  <Badge variant={levelColors[c.level]}>{levelLabels[c.level]}</Badge>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{c.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{c.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Возраст:</span> {c.ageGroup}
                  </div>
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Длительность:</span> {c.duration}
                  </div>
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Рейтинг:</span> {c.rating}/5
                  </div>
                  <div className="text-slate-500">
                    <span className="text-slate-300 font-medium">Мест:</span> {c.currentStudents}/{c.maxStudents}
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
                  <span className="text-2xl font-semibold text-white tabular-nums">{formatPrice(c.price)}</span>
                  <span className="text-slate-600 text-sm">/мес</span>
                </div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <ButtonLink href={`/courses/${c.slug}`} variant="ghost" size="sm">
                    Подробнее
                  </ButtonLink>
                  <ButtonLink href="/enrollment" variant="primary" size="sm">
                    Записаться
                  </ButtonLink>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
