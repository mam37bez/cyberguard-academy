'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const nav = [
  { label: 'Главная', href: '/' },
  { label: 'Курсы', href: '/courses' },
  { label: 'Безопасность', href: '/security-tools' },
  { label: 'Блог', href: '/blog' },
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
    <header className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-cyber-darker/90 backdrop-blur-xl border-b border-cyber-border' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyber-green flex items-center justify-center text-xl">🛡️</div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyber-green animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">CyberGuard</span>
              <span className="text-xl font-light text-primary-400"> Academy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map(i => (
              <Link key={i.href} href={i.href} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">{i.label}</Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href="/enrollment" className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 transition-all">Записаться</Link>
          </div>

          <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-cyber-darker/95 backdrop-blur-xl border-t border-cyber-border">
          <div className="px-4 py-6 space-y-2">
            {nav.map(i => (
              <Link key={i.href} href={i.href} className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl" onClick={() => setMobileOpen(false)}>{i.label}</Link>
            ))}
            <Link href="/enrollment" className="block mt-4 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-center font-semibold rounded-xl" onClick={() => setMobileOpen(false)}>Записаться</Link>
          </div>
        </div>
      )}
    </header>
  );
}
