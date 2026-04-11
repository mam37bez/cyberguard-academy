'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const items = [
  { id: 'p1', label: 'Профили в соцсетях закрыты от лишнего публичного доступа' },
  { id: 'p2', label: 'Номер телефона не опубликован в открытом профиле' },
  { id: 'p3', label: 'Геолокация в приложениях включена только там, где это действительно нужно' },
  { id: 'p4', label: 'Личные фото, документы и чувствительные данные не лежат в открытом доступе' },
  { id: 'p5', label: 'Вы проверяете, какие приложения имеют доступ к камере, микрофону и контактам' },
  { id: 'p6', label: 'В мессенджерах и соцсетях ограничен круг тех, кто может писать и видеть информацию о вас' },
  { id: 'p7', label: 'Вы не публикуете лишние данные о семье, адресе, школе или маршрутах' },
  { id: 'p8', label: 'Вы периодически пересматриваете настройки приватности в аккаунтах' },
];

export function PrivacyChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checkedCount = useMemo(() => {
    return Object.values(checked).filter(Boolean).length;
  }, [checked]);

  const progress = Math.round((checkedCount / items.length) * 100);

  const weakPoints = useMemo(() => {
    return items.filter((item) => !checked[item.id]);
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
            <h2 className="text-2xl font-bold text-white mb-3">Privacy checklist</h2>
            <p className="text-slate-400">
              Быстро проверьте, насколько аккуратно настроена ваша цифровая приватность:
              профили, приложения, доступ к данным и то, что вы публикуете в интернете.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Уровень приватности</span>
              <span className="text-sm text-white font-medium">{progress}%</span>
            </div>

            <div className="w-full h-3 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {items.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!checked[item.id]}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                <span className="text-sm text-slate-400 leading-relaxed">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Что ещё можно улучшить</h3>
            {weakPoints.length > 0 ? (
              <ul className="space-y-2">
                {weakPoints.map((item) => (
                  <li key={item.id} className="flex gap-3 text-sm text-slate-400">
                    <span className="text-yellow-400">•</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400/90">
                Отлично! Базовая цифровая приватность выглядит достаточно аккуратно настроенной.
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
