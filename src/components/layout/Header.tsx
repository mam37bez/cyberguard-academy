'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layout/Container';

const nav = [
  { label: 'Главная', href: '/' },
  { label: 'Курсы', href: '/courses' },
  { label: 'Квизы', href: '/quiz' },
  { label: 'Безопасность', href: '/security-tools' },
  { label: 'Блог', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cyber-darker/92 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-[4.25rem] sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-xl shadow-lg shadow-primary-900/30 ring-1 ring-white/10">
                🛡️
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-cyber-darker" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">CyberGuard</span>
              <span className="text-xl font-light text-primary-400"> Academy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Основное меню">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/enrollment"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-900/25 transition-all hover:from-primary-500 hover:to-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
            >
              Записаться
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden bg-cyber-darker/98 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-4 py-5 space-y-1">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {i.label}
              </Link>
            ))}

            <Link
              href="/enrollment"
              className="block mt-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center text-sm font-semibold rounded-xl shadow-md shadow-primary-900/20"
              onClick={() => setMobileOpen(false)}
            >
              Записаться
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
