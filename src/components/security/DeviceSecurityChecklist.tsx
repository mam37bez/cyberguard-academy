'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const checklistItems = [
  { id: 'c1', label: 'На устройстве включён пароль, PIN-код или биометрия' },
  { id: 'c2', label: 'Операционная система и приложения регулярно обновляются' },
  { id: 'c3', label: 'Приложения устанавливаются только из официальных источников' },
  { id: 'c4', label: 'На устройстве нет лишних или подозрительных приложений' },
  { id: 'c5', label: 'Автоматическое подключение к неизвестным Wi‑Fi сетям отключено' },
  { id: 'c6', label: 'Для важных аккаунтов включена двухфакторная аутентификация' },
  { id: 'c7', label: 'Проверяются ссылки и сообщения перед переходом' },
  { id: 'c8', label: 'Есть резервное копирование важных данных' },
];

export function DeviceSecurityChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checkedCount = useMemo(() => {
    return Object.values(checked).filter(Boolean).length;
  }, [checked]);

  const progress = Math.round((checkedCount / checklistItems.length) * 100);

  const recommendations = useMemo(() => {
    return checklistItems
      .filter((item) => !checked[item.id])
      .map((item) => item.label);
  }, [checked]);

  const toggleItem = (id: string) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetChecklist = () => {
    setChecked({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">
              Чеклист безопасности устройства
            </h2>
            <p className="text-gray-300">
              Быстро проверьте базовые меры защиты на смартфоне, планшете или
              компьютере. Отметьте пункты, которые уже выполняются, и посмотрите,
              что ещё можно улучшить.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Заполненность чеклиста</span>
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
            {checklistItems.map((item) => (
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
            {recommendations.length > 0 ? (
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
                Отлично! Базовые меры безопасности устройства выглядят хорошо настроенными.
              </div>
            )}
          </div>

          <div className="text-center">
            <Button type="button" variant="outline" onClick={resetChecklist}>
              Сбросить чеклист
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
