'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type AnswerState = {
  openedLink: boolean | null;
  enteredData: boolean | null;
  downloadedFile: boolean | null;
};

export function SuspiciousLinkGuide() {
  const [answers, setAnswers] = useState<AnswerState>({
    openedLink: null,
    enteredData: null,
    downloadedFile: null,
  });

  const result = useMemo(() => {
    if (
      answers.openedLink === null &&
      answers.enteredData === null &&
      answers.downloadedFile === null
    ) {
      return null;
    }

    if (answers.enteredData === true) {
      return {
        level: 'Высокий риск',
        color: '#ef4444',
        summary:
          'Если вы вводили пароль, код из SMS, данные карты или другую чувствительную информацию, нужно действовать быстро.',
        actions: [
          'Немедленно смените пароль от аккаунта.',
          'Если использовался тот же пароль в других сервисах — смените и там.',
          'Включите или обновите 2FA.',
          'Если вводили банковские данные — свяжитесь с банком.',
          'Проверьте уведомления о входах и активные устройства.',
        ],
      };
    }

    if (answers.downloadedFile === true) {
      return {
        level: 'Повышенный риск',
        color: '#f97316',
        summary:
          'Если после перехода по ссылке вы скачивали файл или приложение, стоит проверить устройство и быть особенно внимательным.',
        actions: [
          'Не открывайте скачанный файл повторно, если не уверены в его безопасности.',
          'Проверьте устройство и подозрительные приложения.',
          'Обновите систему и браузер.',
          'Смените пароль, если есть сомнения в безопасности аккаунта.',
          'Проверьте, не появилось ли странное поведение устройства.',
        ],
      };
    }

    if (answers.openedLink === true) {
      return {
        level: 'Умеренный риск',
        color: '#f59e0b',
        summary:
          'Если вы только открыли ссылку, но ничего не вводили и ничего не скачивали, риск ниже, но осторожность всё равно нужна.',
        actions: [
          'Закройте страницу и не возвращайтесь к ней.',
          'Проверьте адрес сайта и убедитесь, что вы не вводили данные.',
          'Будьте внимательны к письмам и уведомлениям о входах.',
          'Если есть сомнения — смените пароль и проверьте аккаунт.',
        ],
      };
    }

    return {
      level: 'Низкий риск',
      color: '#22c55e',
      summary:
        'Если вы не открывали ссылку, не вводили данные и не скачивали файлы, то вы уже избежали основного риска.',
      actions: [
        'Удалите подозрительное сообщение.',
        'Не переходите по нему повторно.',
        'Если письмо или сообщение пришло знакомым, предупредите их о риске.',
      ],
    };
  }, [answers]);

  const reset = () => {
    setAnswers({
      openedLink: null,
      enteredData: null,
      downloadedFile: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">
              Что делать после подозрительной ссылки
            </h2>
            <p className="text-slate-400">
              Ответьте на несколько коротких вопросов, чтобы понять уровень риска и
              получить базовые рекомендации по дальнейшим действиям.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-white font-medium mb-4">1. Вы открывали подозрительную ссылку?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, openedLink: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, openedLink: false }))}>
                  Нет
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-white font-medium mb-4">
                2. Вы вводили на странице пароль, код, данные карты или другую важную информацию?
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, enteredData: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, enteredData: false }))}>
                  Нет
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="text-white font-medium mb-4">
                3. Вы скачивали файл, приложение или документ после перехода?
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, downloadedFile: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, downloadedFile: false }))}>
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
