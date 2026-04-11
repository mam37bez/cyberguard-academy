'use client';

import { track } from '@vercel/analytics';

const quickLinks = [
  {
    href: '#security-checker',
    title: 'Общая проверка',
    description: 'Самопроверка привычек',
    icon: '🛡️',
    target: 'security-checker',
  },
  {
    href: '#password-strength',
    title: 'Проверка пароля',
    description: 'Оценка силы пароля',
    icon: '🔐',
    target: 'password-strength',
  },
  {
    href: '#password-generator',
    title: 'Генератор',
    description: 'Создание надёжного пароля',
    icon: '⚙️',
    target: 'password-generator',
  },
  {
    href: '#device-security',
    title: 'Устройство',
    description: 'Базовая защита смартфона и ПК',
    icon: '💻',
    target: 'device-security',
  },
  {
    href: '#privacy-checklist',
    title: 'Приватность',
    description: 'Настройки профилей и данных',
    icon: '👁️',
    target: 'privacy-checklist',
  },
  {
    href: '#suspicious-link',
    title: 'Ссылка',
    description: 'Действия после перехода',
    icon: '🔗',
    target: 'suspicious-link',
  },
  {
    href: '#suspicious-file',
    title: 'Файл',
    description: 'Действия после вложения',
    icon: '📎',
    target: 'suspicious-file',
  },
  {
    href: '#family-security',
    title: 'Семья',
    description: 'Семейные цифровые привычки',
    icon: '👨👩👧',
    target: 'family-security',
  },
  {
    href: '#email-audit',
    title: 'Почта',
    description: 'Мини-аудит защиты почты',
    icon: '✉️',
    target: 'email-audit',
  },
  {
    href: '#account-recovery',
    title: 'Recovery',
    description: 'Первые шаги восстановления',
    icon: '♻️',
    target: 'account-recovery',
  },
];

export function SecurityToolsQuickNav() {
  return (
    <div className="max-w-5xl mx-auto mb-10 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-cyber-card/95 to-cyber-darker/90 p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Быстрый переход к инструментам</h2>
          <p className="text-slate-400">
            Выберите нужный инструмент и сразу перейдите к нужному блоку.
          </p>
        </div>
        <div className="hidden md:flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10 text-primary-300">
          ✦
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() =>
              track('security_tools_quick_nav_click', {
                target: link.target,
                placement: 'quick-nav',
              })
            }
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition duration-200 hover:border-primary-400/40 hover:bg-primary-500/[0.08] hover:shadow-[0_0_24px_rgba(59,130,246,0.08)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.04] via-transparent to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />

            <div className="relative flex h-full flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-500/20 bg-primary-500/10 text-lg shadow-[0_0_18px_rgba(59,130,246,0.06)]">
                  {link.icon}
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary-500/15 bg-primary-500/[0.07] text-primary-300 transition duration-200 group-hover:border-primary-400/30 group-hover:bg-primary-500/[0.14] group-hover:text-white">
                  →
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white leading-5 mb-1">
                  {link.title}
                </h3>
                <p className="text-xs leading-5 text-slate-500">
                  {link.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
