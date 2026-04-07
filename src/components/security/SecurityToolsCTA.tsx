'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';
import { Button } from '@/components/ui/Button';

export function SecurityToolsCTA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6 text-center">
        <div className="text-3xl mb-3">📘</div>
        <h3 className="text-lg font-semibold text-white mb-2">Полезные статьи</h3>
        <p className="text-sm text-gray-300 mb-4">
          Изучите материалы блога о фишинге, паролях, защите аккаунтов,
          смартфона и цифровой безопасности семьи.
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
          <Button variant="outline">Открыть блог</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6 text-center">
        <div className="text-3xl mb-3">🎓</div>
        <h3 className="text-lg font-semibold text-white mb-2">Курсы обучения</h3>
        <p className="text-sm text-gray-300 mb-4">
          Посмотрите программы для детей, подростков и родителей, если хотите
          не только читать, но и системно изучать тему.
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
          <Button variant="primary">Смотреть курсы</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-6 text-center">
        <div className="text-3xl mb-3">✉️</div>
        <h3 className="text-lg font-semibold text-white mb-2">Записаться или спросить</h3>
        <p className="text-sm text-gray-300 mb-4">
          Если хотите подобрать курс или уточнить детали, отправьте заявку,
          и мы поможем выбрать следующий шаг.
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
          <Button variant="outline">Оставить заявку</Button>
        </Link>
      </div>
    </div>
  );
}
