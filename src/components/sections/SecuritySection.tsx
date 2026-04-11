'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { securityThreats } from '@/data/security';
import { FadeInWhenVisible, useHomeStagger } from '@/components/sections/HomeMotion';

export function SecuritySection() {
  const { container, item } = useHomeStagger();

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
        <FadeInWhenVisible>
          <SectionHeading
            dense
            badge="Центр безопасности"
            title="Защита от киберугроз"
            subtitle="Изучите угрозы и научитесь защищаться"
          />
        </FadeInWhenVisible>

        <motion.div
          className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        >
          {securityThreats.map((t) => (
            <motion.div key={t.id} variants={item}>
              <Card variant="default" className="h-full border-white/[0.06] transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transform-none">
                <CardContent>
                  <div className="mb-3 flex items-start justify-between">
                    <span className="text-3xl">{ti[t.type] || '🛡️'}</span>
                    <Badge variant={sc[t.severity]}>{sl[t.severity]}</Badge>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold tracking-tight text-white">{t.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-500">{t.description}</p>

                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400/90">Защита</h4>
                  <ul className="mb-3 space-y-1">
                    {t.protection.slice(0, 3).map((p, i) => (
                      <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-500">
                        <span className="shrink-0 text-emerald-400/80">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-300/90">Признаки</h4>
                  <ul className="space-y-1">
                    {t.indicators.slice(0, 2).map((ind, i) => (
                      <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-500">
                        <span className="shrink-0 text-amber-400/80">!</span>
                        {ind}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <FadeInWhenVisible className="text-center" delay={0.08}>
          <ButtonLink href="/security-tools" size="lg" variant="secondary">
            Проверить безопасность
          </ButtonLink>
        </FadeInWhenVisible>
      </Container>
    </Section>
  );
}
