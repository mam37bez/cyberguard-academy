'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const items = [
  { id: 'e1', label: 'Для почтового аккаунта включена двухфакторная аутентификация' },
  { id: 'e2', label: 'Для почты используется уникальный и достаточно длинный пароль' },
  { id: 'e3', label: 'Проверены резервная почта и номер телефона для восстановления доступа' },
  { id: 'e4', label: 'Проверены активные устройства и подозрительные входы' },
  { id: 'e5', label: 'Нет подозрительных правил пересылки или фильтров в почте' },
  { id: 'e6', label: 'Почта регулярно проверяется на уведомления о безопасности' },
  { id: 'e7', label: 'Вы не вводите пароль от почты на подозрительных сайтах' },
  { id: 'e8', label: 'Резервные коды восстановления сохранены в безопасном месте' },
];

export function EmailSecurityAudit() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checkedCount = useMemo(() => {
    return Object.values(checked).filter(Boolean).length;
  }, [checked]);

  const progress = Math.round((checkedCount / items.length) * 100);

  const weakAreas = useMemo(() => {
    return items.filter((item) => !checked[item.id]);
  }, [checked]);

  const toggleItem = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetAudit = () => {
    setChecked({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Mini Email Security Audit</h2>
            <p className="text-gray-300">
              Проверьте, насколько надёжно защищён ваш основной почтовый аккаунт.
              Почта часто является ключом к восстановлению доступа ко многим другим
              сервисам, поэтому её защита особенно важна.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Уровень защищённости почты</span>
              <span className="text-sm text-white font-medium">{progress}%</span>
            </div>

            <div className="w-full h-3 bg-cyber-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-cyber-green rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {items.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-cyber-border bg-cyber-dark/40 p-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!checked[item.id]}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-300 leading-relaxed">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Что ещё можно улучшить</h3>
            {weakAreas.length > 0 ? (
              <ul className="space-y-2">
                {weakAreas.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-yellow-400">•</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-cyber-green/20 bg-cyber-green/10 p-4 text-sm text-cyber-green">
                Отлично! Базовая защита почтового аккаунта выглядит хорошо настроенной.
              </div>
            )}
          </div>

          <div className="text-center">
            <Button type="button" variant="outline" onClick={resetAudit}>
              Сбросить аудит
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
