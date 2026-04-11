'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SITE_URL } from '@/lib/site';
import { buttonVariants } from '@/lib/button-variants';
import { cn } from '@/lib/utils';
import { FadeInWhenVisible } from '@/components/sections/HomeMotion';

const SHARE_TITLE = 'CyberGuard Academy';
const SHARE_TEXT =
  'Посмотрите CyberGuard Academy — сайт о кибербезопасности, курсах, полезных материалах и цифровой защите для детей, подростков и родителей.';

export function ShareSiteCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: SITE_URL,
        });
      } catch {
        // пользователь отменил или share не выполнился
      }
    } else {
      handleCopy();
    }
  };

  const emailHref = `mailto:?subject=${encodeURIComponent(
    'Рекомендую посмотреть CyberGuard Academy',
  )}&body=${encodeURIComponent(`${SHARE_TEXT}\n\n${SITE_URL}`)}`;

  return (
    <Section dense className="bg-cyber-dark/50 border-t border-white/[0.04]">
      <Container className="max-w-3xl">
        <FadeInWhenVisible>
          <Card variant="glow" className="border-white/[0.06] transition-all duration-500 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
            <CardContent className="pt-2">
              <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-300/80 mb-3">Рассказать</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">Поделиться сайтом</h2>
              <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                Если вам показались полезными материалы, курсы и инструменты сайта, вы можете порекомендовать CyberGuard
                Academy друзьям и близким.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Button type="button" variant="primary" size="lg" onClick={handleShare}>
                  Поделиться
                </Button>

                <Button type="button" variant="outline" size="lg" onClick={handleCopy}>
                  {copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
                </Button>

                <Link
                  href={emailHref}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'text-center')}
                >
                  Отправить по email
                </Link>
              </div>

              <p className="text-xs text-slate-600 mt-6 break-all font-mono">{SITE_URL}</p>
              </div>
            </CardContent>
          </Card>
        </FadeInWhenVisible>
      </Container>
    </Section>
  );
}
