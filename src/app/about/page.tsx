import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'О нас',
  description: 'Узнайте больше о CyberGuard Academy: миссия, ценности, преподаватели и подход к обучению кибербезопасности для детей и взрослых.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading badge="О нас" title="CyberGuard Academy" subtitle="Мы учим защищать, а не атаковать." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Миссия</h2>
            <p className="text-gray-400 mb-4">Дать каждому знания для защиты в цифровом мире.</p>
            <p className="text-gray-400">Мы — White Hat. Наша цель — ЗАЩИТА граждан.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { i: '🛡️', t: 'Защита', d: 'Обучаем защите' },
              { i: '🎓', t: 'Образование', d: 'Для всех возрастов' },
              { i: '🤝', t: 'Этика', d: 'White Hat' },
              { i: '🌍', t: 'Доступность', d: 'Знания для каждого' },
            ].map((x) => (
              <Card key={x.t} variant="default">
                <CardContent>
                  <div className="text-3xl mb-2">{x.i}</div>
                  <h3 className="font-bold text-white mb-1">{x.t}</h3>
                  <p className="text-gray-400 text-sm">{x.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="p-12 rounded-2xl bg-gradient-to-br from-primary-900/30 to-cyber-card border border-primary-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { v: '2020', l: 'Год основания' },
              { v: '1500+', l: 'Учеников' },
              { v: '12', l: 'Преподавателей' },
              { v: '98%', l: 'Рекомендуют' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent mb-1">
                  {s.v}
                </div>
                <div className="text-sm text-gray-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
