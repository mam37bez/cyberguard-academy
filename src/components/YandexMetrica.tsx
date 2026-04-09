'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function YandexMetrica({ YM_ID }: { YM_ID: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!YM_ID) return;

    // @ts-ignore
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      (k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // @ts-ignore
    ym(YM_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
    });
  }, [YM_ID]);

  useEffect(() => {
    // @ts-ignore
    if (window.ym) {
      // @ts-ignore
      window.ym(YM_ID, 'hit', pathname);
    }
  }, [pathname, YM_ID]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YM_ID}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}
