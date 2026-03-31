import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-cyber-darker border-t border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyber-green flex items-center justify-center text-xl">
                🛡️
              </div>
              <span className="text-lg font-bold text-white">
                CyberGuard
                <span className="font-light text-primary-400"> Academy</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm mb-4">
              Образовательная платформа по кибербезопасности для детей, подростков и родителей.
            </p>

            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="text-cyber-green font-mono">White Hat Education</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white text-sm">
                  Курсы
                </Link>
              </li>
              <li>
                <Link href="/security-tools" className="text-gray-400 hover:text-white text-sm">
                  Безопасность
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Курсы</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/courses/cybersecurity-junior"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  КиберЮниор
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/cybersecurity-explorer"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  КиберИсследователь
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/cybersecurity-pro"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  КиберПро
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/cybersecurity-parents"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  КиберРодитель
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>📍 г. Минск</li>
              <li>📞 +375 (29) 123-45-67</li>
              <li>✉️ info@cyberguard.academy</li>
              <li>🕒 Пн-Сб: 9:00-20:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cyber-border text-center">
          <p className="text-gray-500 text-sm">© 2026 CyberGuard Academy. White Hat Education.</p>
        </div>
      </div>
    </footer>
  );
}
