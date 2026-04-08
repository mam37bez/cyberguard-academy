'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';
import { Button } from '@/components/ui/Button';

export function SecurityToolsCTA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6 text-center">
        <div className="text-3xl mb-3"> </div>
        <h3 className="text-lg font-semibold text-white mb-2">Перейти к статьям по теме</h3>
        <p className="text-sm text-gray-300 mb-4">
          Начните с материалов о фишинге, паролях, защите аккаунтов, безопасности смартфона и цифровых
          правилах для семьи.
        </p>
        <Link
          href="/blog"
          onClick={() =>
            track('security_tools_to_blog', {
              source: 'security-tools',
              destination: 'blog',
              placement: 'bottom-cta',
            })
          }
        >
          <Button variant="outline">Перейти к статьям</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6 text-center">
        <div className="text-3xl mb-3"> </div>
        <h3 className="text-lg font-semibold text-white mb-2">Подобрать курс обучения</h3>
        <p className="text-sm text-gray-300 mb-4">
          Сравните программы для детей, подростков и родителей и выберите уровень, который лучше
          подходит по возрасту и подготовке.
        </p>
        <Link
          href="/courses"
          onClick={() =>
            track('security_tools_to_courses', {
              source: 'security-tools',
              destination: 'courses',
              placement: 'bottom-cta',
            })
          }
        >
          <Button variant="primary">Подобрать курс</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6 text-center">
        <div className="text-3xl mb-3"> </div>
        <h3 className="text-lg font-semibold text-white mb-2">Записаться на консультацию</h3>
        <p className="text-sm text-gray-300 mb-4">
          Оставьте заявку — мы поможем выбрать курс, подскажем следующий шаг и ответим на вопросы по
          формату обучения.
        </p>
        <Link
          href="/enrollment"
          onClick={() =>
            track('security_tools_to_enrollment', {
              source: 'security-tools',
              destination: 'enrollment',
              placement: 'bottom-cta',
            })
          }
        >
          <Button variant="outline">Записаться на консультацию</Button>
        </Link>
      </div>
    </div>
  );
}
