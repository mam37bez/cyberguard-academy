'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const auditItems = [
  { id: 'a1', label: 'Для аккаунта используется уникальный пароль' },
  { id: 'a2', label: 'Для аккаунта включена двухфакторная аутентификация' },
  { id: 'a3', label: 'Резервная почта и номер телефона актуальны' },
  { id: 'a4', label: 'Вы проверяете уведомления о входе и подозрительной активности' },
  { id: 'a5', label: 'Вы периодически просматриваете активные устройства и сессии' },
  { id: 'a6', label: 'У вас есть безопасный способ хранить recovery / backup codes' },
  { id: 'a7', label: 'Вы не вводите пароль после перехода по подозрительным ссылкам' },
  { id: 'a8', label: 'Для почты, связанной с аккаунтом, тоже включена защита' },
];

export function AccountSecurityAudit() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checkedCount = useMemo(() => {
    return Object.values(checked).filter(Boolean).length;
  }, [checked]);

  const progress = Math.round((checkedCount / auditItems.length) * 100);

  const weakPoints = useMemo(() => {
    return auditItems.filter((item) => !checked[item.id]);
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
            <h2 className="text-2xl font-bold text-white mb-3">Мини-аудит аккаунта</h2>
            <p className="text-gray-300">
              Проверьте базовые меры защиты аккаунта: пароль, 2FA, резервные данные,
              уведомления, активные устройства и общую осторожность при входе.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Состояние защиты аккаунта</span>
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
            {auditItems.map((item) => (
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
            <h3 className="text-lg font-semibold text-white mb-3">Что ещё стоит улучшить</h3>
            {weakPoints.length > 0 ? (
              <ul className="space-y-2">
                {weakPoints.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-yellow-400">•</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-cyber-green/20 bg-cyber-green/10 p-4 text-sm text-cyber-green">
                Отлично! Базовая защита аккаунта выглядит хорошо настроенной.
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
