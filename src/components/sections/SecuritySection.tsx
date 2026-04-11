'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { securityThreats } from '@/data/security';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function SecuritySection() {
  const { ref, isVisible } = useScrollAnimation();

  const sl: Record<string, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    critical: 'Критический',
  };

  const sc: Record<string, 'info' | 'warning' | 'danger'> = {
    low: 'info',
    medium: 'warning',
    high: 'danger',
    critical: 'danger',
  };

  const ti: Record<string, string> = {
    phishing: '🎣',
    social_engineering: '🧠',
    scam_call: '📞',
    data_breach: '🕵️',
    ransomware: '💀',
  };

  return (
    <Section className="bg-cyber-darker">
      <Container>
        <SectionHeading
          dense
          badge="Центр безопасности"
          title="Защита от киберугроз"
          subtitle="Изучите угрозы и научитесь защищаться"
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10 transition-all duration-700 motion-reduce:transition-none ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0'
          }`}
        >
          {securityThreats.map((t) => (
            <Card key={t.id} variant="default">
              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{ti[t.type] || '🛡️'}</span>
                  <Badge variant={sc[t.severity]}>{sl[t.severity]}</Badge>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{t.name}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{t.description}</p>

                <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-400/90 mb-2">Защита</h4>
                <ul className="space-y-1 mb-3">
                  {t.protection.slice(0, 3).map((p, i) => (
                    <li key={i} className="text-xs text-slate-500 flex gap-2 leading-relaxed">
                      <span className="text-emerald-400/80 shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-300/90 mb-2">Признаки</h4>
                <ul className="space-y-1">
                  {t.indicators.slice(0, 2).map((ind, i) => (
                    <li key={i} className="text-xs text-slate-500 flex gap-2 leading-relaxed">
                      <span className="text-amber-400/80 shrink-0">!</span>
                      {ind}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <ButtonLink href="/security-tools" size="lg" variant="secondary">
            Проверить безопасность
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
