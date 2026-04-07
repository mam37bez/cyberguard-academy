'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type RecoveryAnswers = {
  lostAccess: boolean | null;
  emailCompromised: boolean | null;
  samePasswordUsed: boolean | null;
};

export function AccountRecoveryGuide() {
  const [answers, setAnswers] = useState<RecoveryAnswers>({
    lostAccess: null,
    emailCompromised: null,
    samePasswordUsed: null,
  });

  const result = useMemo(() => {
    if (
      answers.lostAccess === null &&
      answers.emailCompromised === null &&
      answers.samePasswordUsed === null
    ) {
      return null;
    }

    if (answers.emailCompromised === true) {
      return {
        level: 'Высокий приоритет',
        color: '#ef4444',
        summary:
          'Если под угрозой оказалась почта, это критично: через неё часто восстанавливаются другие аккаунты.',
        actions: [
          'Срочно смените пароль от почты.',
          'Проверьте резервную почту и номер телефона для восстановления.',
          'Завершите неизвестные сессии и проверьте историю входов.',
          'Включите 2FA, если она ещё не активна.',
          'Проверьте, не настроены ли подозрительные правила пересылки.',
          'После этого смените пароли от других важных сервисов.',
        ],
      };
    }

    if (answers.lostAccess === true && answers.samePasswordUsed === true) {
      return {
        level: 'Повышенный риск',
        color: '#f97316',
        summary:
          'Если доступ потерян и тот же пароль использовался в других сервисах, риск цепного взлома становится намного выше.',
        actions: [
          'Восстановите доступ к аккаунту через официальный путь восстановления.',
          'Смените тот же пароль в других сервисах, где он использовался.',
          'Включите 2FA везде, где это возможно.',
          'Проверьте, не пришли ли уведомления о входах в другие аккаунты.',
          'Предупредите близких, если злоумышленник мог писать от вашего имени.',
        ],
      };
    }

    if (answers.lostAccess === true) {
      return {
        level: 'Средний риск',
        color: '#f59e0b',
        summary:
          'Если вы потеряли доступ к аккаунту, важно как можно быстрее пройти официальный сценарий восстановления и проверить связанные аккаунты.',
        actions: [
          'Используйте официальную форму восстановления доступа.',
          'Проверьте резервную почту и номер телефона.',
          'После восстановления сразу смените пароль.',
          'Включите 2FA и завершите другие активные сессии.',
        ],
      };
    }

    return {
      level: 'Низкий риск',
      color: '#22c55e',
      summary:
        'Если доступ не потерян, но были подозрения, стоит всё равно проверить почту, пароли и уведомления о входах.',
      actions: [
        'Проверьте важные аккаунты и активные сессии.',
        'Смените пароль, если есть сомнения.',
        'Включите 2FA в ключевых сервисах.',
        'Следите за уведомлениями о входах и подозрительной активности.',
      ],
    };
  }, [answers]);

  const reset = () => {
    setAnswers({
      lostAccess: null,
      emailCompromised: null,
      samePasswordUsed: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Mini Account Recovery Guide</h2>
            <p className="text-gray-300">
              Если вы потеряли доступ к аккаунту или подозреваете взлом, этот мини-гайд
              поможет быстро сориентироваться и понять, какие шаги сделать в первую очередь.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-5">
              <div className="text-white font-medium mb-4">1. Вы потеряли доступ к аккаунту?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, lostAccess: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, lostAccess: false }))}>
                  Нет
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-5">
              <div className="text-white font-medium mb-4">2. Есть подозрение, что под угрозой могла оказаться почта?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, emailCompromised: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, emailCompromised: false }))}>
                  Нет
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-cyber-border bg-cyber-dark/40 p-5">
              <div className="text-white font-medium mb-4">3. Использовался ли такой же пароль в других сервисах?</div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setAnswers((p) => ({ ...p, samePasswordUsed: true }))}>
                  Да
                </Button>
                <Button type="button" variant="outline" onClick={() => setAnswers((p) => ({ ...p, samePasswordUsed: false }))}>
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
              <p className="text-gray-300 mb-5">{result.summary}</p>

              <h3 className="text-white font-semibold mb-3">Что сделать сейчас</h3>
              <ul className="space-y-2">
                {result.actions.map((action, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-300">
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
