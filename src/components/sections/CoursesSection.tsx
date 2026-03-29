'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { courses } from '@/data/courses';
import { formatPrice } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function CoursesSection() {
  const { ref, isVisible } = useScrollAnimation();
  const ll: Record<string,string> = {beginner:'Начальный',intermediate:'Средний',advanced:'Продвинутый'};
  const lc: Record<string,string> = {beginner:'success',intermediate:'warning',advanced:'danger'};
  return (
    <section className="py-24 bg-cyber-dark relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-50" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading badge="Наши программы" title="Курсы кибербезопасности" subtitle="Программы для всех возрастов" />
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}>
          {courses.map(c=>(
            <Card key={c.id} variant="gradient" className="flex flex-col">
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{c.icon}</div>
                  <Badge variant={lc[c.level] as any}>{ll[c.level]}</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{c.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-sm text-gray-400">👥 {c.ageGroup}</div>
                  <div className="text-sm text-gray-400">📅 {c.duration}</div>
                  <div className="text-sm text-gray-400">⭐ {c.rating}/5</div>
                  <div className="text-sm text-gray-400">👨‍🎓 {c.currentStudents}/{c.maxStudents}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {c.skills.slice(0,3).map(s=>(<Badge key={s} variant="outline" size="sm">{s}</Badge>))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex items-center justify-between">
                <div><span className="text-2xl font-bold text-white">{formatPrice(c.price)}</span><span className="text-gray-500 text-sm">/мес</span></div>
                <div className="flex gap-2">
                  <Link href={'/courses/'+c.slug}><Button variant="ghost" size="sm">Подробнее</Button></Link>
                  <Link href="/enrollment"><Button variant="primary" size="sm">Записаться</Button></Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
