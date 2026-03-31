'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/security';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-cyber-dark relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-30" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Отзывы"
          title="Что говорят ученики"
          subtitle="Реальные отзывы"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {testimonials.map((t) => (
            <Card key={t.id} variant="default">
              <CardContent>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < t.rating ? 'text-yellow-400' : 'text-gray-600'}>
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 text-sm mb-6 italic">&ldquo;{t.content}&rdquo;</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-cyber-green flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
