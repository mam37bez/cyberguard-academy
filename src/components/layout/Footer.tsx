import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

const footerLink =
  'text-sm text-slate-500 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:text-primary-200';

const footerAccentLink =
  'text-primary-400/90 hover:text-primary-300 underline-offset-2 hover:underline rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45';

export function Footer() {
  return (
    <footer className="bg-cyber-darker border-t border-white/[0.06]">
      <Container className="py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-xl shadow-md shadow-primary-900/25 ring-1 ring-white/10">
                🛡️
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                CyberGuard
                <span className="font-normal text-primary-300/90"> Academy</span>
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">
              Образовательная платформа по кибербезопасности для детей, подростков и родителей.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" aria-hidden />
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-slate-400">
                White Hat Education
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">Навигация</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/courses', label: 'Курсы' },
                { href: '/security-tools', label: 'Безопасность' },
                { href: '/blog', label: 'Блог' },
                { href: '/about', label: 'О нас' },
                { href: '/contact', label: 'Контакты' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">Программы</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/courses/cybersecurity-junior', label: 'КиберЮниор' },
                { href: '/courses/cybersecurity-explorer', label: 'КиберИсследователь' },
                { href: '/courses/cybersecurity-pro', label: 'КиберПро' },
                { href: '/courses/cybersecurity-parents', label: 'КиберРодитель' },
                { href: '/faq', label: 'FAQ' },
                { href: '/privacy', label: 'Конфиденциальность' },
                { href: '/terms', label: 'Условия использования' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">Связь</h3>
            <ul className="space-y-3 text-sm text-slate-500 leading-relaxed">
              <li>
                <span className="text-slate-600 block text-xs uppercase tracking-wide mb-1">Город</span>
                Минск и другие{' '}
                <Link href="/locations" className={footerAccentLink}>
                  локации
                </Link>
              </li>
              <li>
                <span className="text-slate-600 block text-xs uppercase tracking-wide mb-1">Заявка и вопросы</span>
                <Link href="/contact" className={footerAccentLink}>
                  Форма обратной связи
                </Link>
              </li>
              <li>
                <span className="text-slate-600 block text-xs uppercase tracking-wide mb-1">Запись на курс</span>
                <Link href="/enrollment" className={footerAccentLink}>
                  Онлайн-запись
                </Link>
              </li>
              <li className="text-slate-600 text-xs pt-1">Телефоны филиалов указаны в контактах и на странице локаций.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
          <p className="text-slate-600 text-xs sm:text-sm">© {new Date().getFullYear()} CyberGuard Academy. White Hat Education.</p>
        </div>
      </Container>
    </footer>
  );
}
