'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const SITE_URL = 'https://cyberguard-academy.vercel.app';
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
    'Рекомендую посмотреть CyberGuard Academy'
  )}&body=${encodeURIComponent(`${SHARE_TEXT}\n\n${SITE_URL}`)}`;

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="text-center">
            <div className="text-5xl mb-4">📣</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Поделиться сайтом
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Если вам показались полезными материалы, курсы и инструменты сайта,
              вы можете легко порекомендовать CyberGuard Academy друзьям, коллегам
              и близким.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button type="button" variant="primary" size="lg" onClick={handleShare}>
                Поделиться
              </Button>

              <Button type="button" variant="outline" size="lg" onClick={handleCopy}>
                {copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}
              </Button>

              <a href={emailHref}>
                <Button type="button" variant="ghost" size="lg">
                  Отправить по email
                </Button>
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-6 break-all">{SITE_URL}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
