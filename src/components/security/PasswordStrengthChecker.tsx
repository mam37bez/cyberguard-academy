'use client';

import React, { useMemo, useState } from 'react';
import { track } from '@vercel/analytics';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

function evaluatePassword(password: string) {
  let score = 0;

  const checks = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    noCommon: !/123456|password|qwerty|admin|111111/i.test(password),
  };

  if (checks.length) score += 25;
  if (checks.lower) score += 10;
  if (checks.upper) score += 10;
  if (checks.number) score += 15;
  if (checks.symbol) score += 20;
  if (checks.noCommon) score += 20;

  let label = 'Очень слабый';
  let color = '#ef4444';

  if (score >= 85) {
    label = 'Очень надёжный';
    color = '#22c55e';
  } else if (score >= 65) {
    label = 'Хороший';
    color = '#06b6d4';
  } else if (score >= 45) {
    label = 'Средний';
    color = '#f59e0b';
  } else if (score >= 25) {
    label = 'Слабый';
    color = '#f97316';
  }

  return { score, label, color, checks };
}

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [hasTrackedCheck, setHasTrackedCheck] = useState(false);

  const result = useMemo(() => evaluatePassword(password), [password]);

  const recommendations = [
    !result.checks.length && 'Сделайте пароль длиной не менее 12 символов.',
    !result.checks.lower && 'Добавьте строчные буквы.',
    !result.checks.upper && 'Добавьте заглавные буквы.',
    !result.checks.number && 'Добавьте цифры.',
    !result.checks.symbol && 'Добавьте специальные символы.',
    !result.checks.noCommon && 'Не используйте слишком распространённые и легко угадываемые комбинации.',
  ].filter(Boolean) as string[];

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!hasTrackedCheck && value.trim().length > 0) {
      track('password_strength_checked', {
        source: 'security-tools',
        tool: 'password-strength-checker',
      });
      setHasTrackedCheck(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Проверка силы пароля</h2>
            <p className="text-gray-300">
              Введите пример пароля и посмотрите, насколько он устойчив с точки зрения
              базовых правил цифровой безопасности. Не вводите сюда реальные пароли от
              важных аккаунтов.
            </p>
          </div>

          <div className="mb-6">
            <Input
              label="Пример пароля"
              type="text"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Например: MySecurePass!2026"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Оценка надёжности</span>
              <span className="text-sm font-medium" style={{ color: result.color }}>
                {result.label}
              </span>
            </div>

            <div className="w-full h-3 bg-cyber-dark rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 rounded-full"
                style={{
                  width: `${result.score}%`,
                  backgroundColor: result.color,
                }}
              />
            </div>

            <div className="mt-2 text-sm text-gray-400">{result.score} / 100</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4 text-sm text-gray-300">
              {result.checks.length ? '✅' : '⚠️'} Длина не менее 12 символов
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4 text-sm text-gray-300">
              {result.checks.lower ? '✅' : '⚠️'} Есть строчные буквы
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4 text-sm text-gray-300">
              {result.checks.upper ? '✅' : '⚠️'} Есть заглавные буквы
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4 text-sm text-gray-300">
              {result.checks.number ? '✅' : '⚠️'} Есть цифры
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4 text-sm text-gray-300">
              {result.checks.symbol ? '✅' : '⚠️'} Есть спецсимволы
            </div>
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4 text-sm text-gray-300">
              {result.checks.noCommon ? '✅' : '⚠️'} Нет слишком популярных шаблонов
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Рекомендации</h3>

            {password.length === 0 ? (
              <p className="text-gray-400 text-sm">
                Введите пример пароля, чтобы увидеть оценку и рекомендации.
              </p>
            ) : recommendations.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-yellow-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-cyber-green/20 bg-cyber-green/10 p-4 text-sm text-cyber-green">
                Отличный результат. Такой пароль выглядит значительно надёжнее базовых
                и слабых комбинаций.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
