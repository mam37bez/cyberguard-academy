'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

declare global {
  interface Window {
    ym: any;
  }
}

function normalizeYmCounterId(raw: string): string {
  return raw.replace(/^id\s*=\s*/i, '').trim();
}

export function YandexMetrica({ YM_ID }: { YM_ID: string }) {
  const pathname = usePathname();
  const counterId = normalizeYmCounterId(YM_ID);

  useEffect(() => {
    if (!counterId) return;

    // Yandex Metrica loader
    (function (m: any, e: any, t: any, r: any, i: any, k: any, a: any) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date().getTime();
      for (var j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) {
          return;
        }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(
      window,
      document,
      'script',
      'https://mc.yandex.ru/metrika/tag.js',
      'ym',
      null,
      null
    );

    if (window.ym) {
      window.ym(counterId, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
      });
    }
  }, [counterId]);

  useEffect(() => {
    if (!counterId || !window.ym) return;
    window.ym(counterId, 'hit', pathname);
  }, [pathname, counterId]);

  return (
    <noscript>
      <div>
        <Image
          src={`https://mc.yandex.ru/watch/${counterId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt="Yandex Metrica"
          width={1}
          height={1}
          unoptimized
        />
      </div>
    </noscript>
  );
}
