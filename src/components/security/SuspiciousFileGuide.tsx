'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type AnswerState = {
  downloaded: boolean | null;
  opened: boolean | null;
  ranApp: boolean | null;
};

export function SuspiciousFileGuide() {
  const [answers, setAnswers] = useState<AnswerState>({
    downloaded: null,
    opened: null,
    ranApp: null,
  });

  const result = useMemo(() => {
    if (
      answers.downloaded === null &&
      answers.opened === null &&
      answers.ranApp === null
    ) {
      return null;
    }

    if (answers.ranApp === true) {
      return {
        level: 'Высокий риск',
        color: '#ef4444',
        summary:
          'Если вы запускали подозрительный файл, приложение или вложение, нужно как можно быстрее проверить устройство и ограничить возможный ущерб.',
        actions: [
          'Отключите устройство от сети, если есть сильные подозрения на заражение.',
          'Проверьте систему, приложения и расширения браузера.',
          'Не вводите пароли на устройстве, пока не уверены в его безопасности.',
          'Смените пароли от важных аккаунтов с другого безопасного устройства.',
          'Проверьте уведомления о входах и безопасность почты.',
        ],
      };
    }

    if (answers.opened === true) {
      return {
        level: 'Повышенный риск',
        color: '#f97316',
        summary:
          'Если вы открывали вложение или файл, риск выше, чем при простом скачивании. Нужна осторожная проверка устройства.',
        actions: [
          'Закройте файл и не открывайте его повторно.',
          'Удалите подозрительный файл, если уверены, что он не нужен.',
          'Проверьте устройство на подозрительное поведение.',
          'Обновите систему и приложения.',
          'Если после открытия были странные события — смените важные пароли.',
        ],
      };
    }

    if (answers.downloaded === true) {
      return {
        level: 'Умеренный риск',
        color: '#f59e0b',
        summary:
          'Если файл только скачан, но не открыт и не запущен, риск ниже, но всё равно стоит быть внимательным.',
        actions: [
          'Не открывайте файл, пока не убедитесь, что источник надёжен.',
          'Удалите файл, если есть сомнения.',
          'Проверьте, откуда он пришёл и зачем его просили скачать.',
          'Не отправляйте этот файл другим людям.',
        ],
      };
    }

    return {
      level: 'Низкий риск',
      color: '#22c55e',
      summary:
        'Если вы не скачивали, не открывали и не запускали подозрительное вложение, то основной риск был предотвращён.',
      actions: [
        'Удалите подозрительное письмо или сообщение.',
        'Предупредите близких, если получили массовую рассылку или похожую схему.',
        'Не переходите к файлу повторно.',
      ],
    };
  }, [answers]);

  const reset = () => {
    setAnswers({
      downloaded: null,
      opened: null,
      ranApp: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">
              Что делать после подозрительного файла или вложения
            </h2>
            <p className="text-slate-400">
              Если вы скачали, открыли или даже запустили подозрительный файл, этот
              мини-гайд поможет быстро оценить ситуацию и понять, какие шаги сделать дальше.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-white font-medium mb-4">1. Вы скачивали подозрительный файл или вложение?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, downloaded: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, downloaded: false }))}>
                  Нет
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-white font-medium mb-4">2. Вы открывали этот файл или вложение?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, opened: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, opened: false }))}>
                  Нет
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-white font-medium mb-4">3. Вы запускали приложение, файл или давали ему активные разрешения?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, ranApp: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, ranApp: false }))}>
                  Нет
                </Button>
              </div>
            </div>
          </div>

          {result && (
            <div className="rounded-2xl border p-6 mb-6" style={{ borderColor: result.color }}>
              <div className="text-lg font-semibold mb-3" style={{ color: result.color }}>
                {result.level}
              </div>
              <p className="text-slate-400 mb-5">{result.summary}</p>

              <h3 className="text-white font-semibold mb-3">Что сделать сейчас</h3>
              <ul className="space-y-2">
                {result.actions.map((action, index) => (
                  <li key={index} className="flex gap-3 text-sm text-slate-400">
                    <span className="text-yellow-400">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-center">
            <Button type="button" variant="outline" onClick={reset}>
              Сбросить ответы
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
