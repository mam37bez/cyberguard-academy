'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const questions = [
  {
    id: 'f1',
    text: 'В семье обсуждаются правила безопасности в интернете',
    category: 'Общение',
  },
  {
    id: 'f2',
    text: 'Ребёнок знает, что нельзя сообщать пароли и коды из SMS',
    category: 'Пароли и коды',
  },
  {
    id: 'f3',
    text: 'Устройства ребёнка и родителей защищены паролем или биометрией',
    category: 'Устройства',
  },
  {
    id: 'f4',
    text: 'В семье обсуждают подозрительные ссылки, сообщения и звонки',
    category: 'Фишинг и мошенничество',
  },
  {
    id: 'f5',
    text: 'Настройки приватности в соцсетях и приложениях проверяются регулярно',
    category: 'Приватность',
  },
  {
    id: 'f6',
    text: 'Есть понятные семейные правила о том, что можно публиковать в интернете',
    category: 'Поведение в сети',
  },
  {
    id: 'f7',
    text: 'Родители понимают базовые цифровые риски для ребёнка',
    category: 'Осознанность',
  },
  {
    id: 'f8',
    text: 'Ребёнок знает, что делать, если его пугает сообщение, сайт или человек в интернете',
    category: 'Реакция на риск',
  },
];

export function FamilySecurityCheck() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const checkedCount = useMemo(() => {
    return Object.values(answers).filter(Boolean).length;
  }, [answers]);

  const progress = Math.round((checkedCount / questions.length) * 100);

  const weakAreas = useMemo(() => {
    return questions.filter((q) => !answers[q.id]);
  }, [answers]);

  const recommendations = useMemo(() => {
    return weakAreas.map((item) => item.text);
  }, [weakAreas]);

  const toggleItem = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetCheck = () => {
    setAnswers({});
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Family Security Check</h2>
            <p className="text-slate-400">
              Этот мини-чек помогает понять, насколько в семье уже выстроены базовые
              правила цифровой безопасности и где ещё можно усилить защиту ребёнка и
              близких.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Семейная готовность</span>
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
            {questions.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!answers[item.id]}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                <div>
                  <div className="text-xs text-primary-400 mb-1">{item.category}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{item.text}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">Что ещё можно улучшить</h3>
            {recommendations.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm text-slate-400">
                    <span className="text-yellow-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400/90">
                Отлично! У вашей семьи уже есть хороший базовый уровень цифровой осознанности и защиты.
              </div>
            )}
          </div>

          <div className="text-center">
            <Button type="button" variant="outline" onClick={resetCheck}>
              Сбросить чеклист
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
