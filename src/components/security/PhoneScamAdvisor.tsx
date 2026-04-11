'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { track } from '@vercel/analytics';

type Q = {
  id: string;
  label: string;
};

const QUESTIONS: Q[] = [
  { id: 'codes', label: 'Просят назвать код из SMS, push или «подтверждение входа»' },
  { id: 'card', label: 'Просят CVV, полный номер карты, PIN или «безопасный счёт» для перевода' },
  { id: 'app', label: 'Просят установить приложение, AnyDesk, «защиту банка», дать доступ к экрану' },
  { id: 'urgent', label: 'Сильное давление: «секретно», «не кладите трубку», «сейчас заблокируют»' },
  { id: 'authority', label: 'Представляются полицией, ФСБ, налоговой, банком, «службой безопасности», иностранной спецслужбой' },
  { id: 'callback', label: 'Номер неизвестен; просят не перезванивать по официальному номеру' },
];

export function PhoneScamAdvisor() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const summary = useMemo(() => {
    const n = selected.size;
    if (n === 0) return null;
    if (selected.has('codes') || selected.has('card') || selected.has('app')) {
      return {
        level: 'Высокая вероятность мошенничества',
        body: 'Так не работают ни банки, ни государственные службы в нормальной практике. Положите трубку и перезвоните сами по номеру с карты или с официального сайта. Не устанавливайте программы и не называйте коды.',
      };
    }
    if (n >= 2) {
      return {
        level: 'Сочетание тревожных признаков',
        body: 'Скорее всего это социальная инженерия. Завершите разговор, не передавайте данные. При сомнениях перезвоните в организацию через проверенный канал.',
      };
    }
    return {
      level: 'Есть повод насторожиться',
      body: 'Если что-то кажется странным — лучше прервать звонок и проверить информацию самостоятельно. Срочность почти всегда работает против вас.',
    };
  }, [selected]);

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <h2 className="text-2xl font-bold text-white mb-3">Звонок вымогателей или «служб»</h2>
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 mb-6 text-sm text-slate-300 leading-relaxed">
            <p className="font-medium text-amber-200/95 mb-2">Чего этот инструмент не делает</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>
                <strong className="text-slate-300">Не проверяет</strong>, кто реально звонит: номер легко подделать
                (spoofing), любой сайт не имеет доступа к сетям операторов.
              </li>
              <li>
                <strong className="text-slate-300">Не определяет</strong> MI6, MI5, GCHQ или другие спецслужбы — у
                публичного интернет-сайта нет таких баз и это было бы обманом.
              </li>
              <li>
                Реальные органы и банки <strong className="text-slate-300">не требуют</strong> по неожиданному звонку
                пароли, коды из SMS, установку сторонних программ и срочный перевод денег незнакомым реквизитам.
              </li>
            </ul>
          </div>

          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Отметьте, что говорит собеседник. Это образовательная самопроверка по типичным схемам колл-центров и
            имитации «официальных» звонков — в том числе когда называют иностранные или российские структуры.
          </p>

          <div className="space-y-3 mb-8">
            {QUESTIONS.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => toggle(q.id)}
                className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                  selected.has(q.id)
                    ? 'border-primary-500/50 bg-primary-500/15 text-white'
                    : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/15'
                }`}
              >
                <span className="mr-2 inline-block w-4 text-primary-400">{selected.has(q.id) ? '✓' : '○'}</span>
                {q.label}
              </button>
            ))}
          </div>

          {summary && (
            <div className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-5 mb-6">
              <p className="text-lg font-semibold text-white mb-2">{summary.level}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{summary.body}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSelected(new Set());
                track('phone_scam_advisor_reset');
              }}
            >
              Сбросить
            </Button>
          </div>

          <p className="mt-8 text-xs text-slate-600 leading-relaxed">
            Если угроза жизни или шантаж — обращайтесь в местную полицию по экстренному номеру. Материал носит
            просветительский характер и не заменяет консультацию юриста или правоохранительных органов.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
