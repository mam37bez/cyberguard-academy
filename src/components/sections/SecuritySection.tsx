'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { securityThreats } from '@/data/security';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function SecuritySection() {
  const { ref, isVisible } = useScrollAnimation();
  const sl: Record<string,string> = {low:'Низкий',medium:'Средний',high:'Высокий',critical:'Критический'};
  const sc: Record<string,string> = {low:'info',medium:'warning',high:'danger',critical:'danger'};
  const ti: Record<string,string> = {phishing:'🎣',social_engineering:'🎭',scam_call:'📞',data_breach:'💾',ransomware:'🔐'};
  return (
    <section className="py-24 bg-cyber-darker">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading badge="Центр безопасности" title="Защита от киберугроз" subtitle="Изучите угрозы и научитесь защищаться" />
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-700 ${isVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-10'}`}>
          {securityThreats.map(t=>(
            <Card key={t.id} variant="default">
              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{ti[t.type]||'⚠️'}</span>
                  <Badge variant={sc[t.severity] as any}>{sl[t.severity]}</Badge>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{t.description}</p>
                <h4 className="text-sm font-semibold text-cyber-green mb-2">🛡️ Защита:</h4>
                <ul className="space-y-1 mb-3">
                  {t.protection.slice(0,3).map((p,i)=>(<li key={i} className="text-xs text-gray-400 flex gap-2"><span className="text-cyber-green">✓</span>{p}</li>))}
                </ul>
                <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Признаки:</h4>
                <ul className="space-y-1">
                  {t.indicators.slice(0,2).map((ind,i)=>(<li key={i} className="text-xs text-gray-400 flex gap-2"><span className="text-yellow-400">!</span>{ind}</li>))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/security-tools"><Button size="lg" variant="secondary">🔒 Проверить безопасность</Button></Link>
        </div>
      </div>
    </section>
  );
}
