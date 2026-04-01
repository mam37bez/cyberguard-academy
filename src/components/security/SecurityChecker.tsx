'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getSecurityLevel } from '@/lib/utils';

const questions = [
  { id: 'q1', text: 'Используете ли вы разные пароли для разных сервисов?', category: 'Пароли', weight: 15 },
  { id: 'q2', text: 'Включена ли у вас двухфакторная аутентификация?', category: '2FA', weight: 15 },
  { id: 'q3', text: 'Обновляете ли вы операционную систему и приложения регулярно?', category: 'Обновления', weight: 10 },
  { id: 'q4', text: 'Используете ли вы защиту устройства и антивирусные инструменты?', category: 'Защита', weight: 10 },
  { id: 'q5', text: 'Проверяете ли вы ссылки перед переходом?', category: 'Фишинг', weight: 10 },
  { id: 'q6', text: 'Избегаете ли вы чувствительных операций в небезопасных сетях?', category: 'Сеть', weight: 10 },
  { id: 'q7', text: 'Делаете ли вы резервные копии важных данных?', category: 'Бэкапы', weight: 10 },
  { id: 'q8', text: 'Знаете ли вы, как распознать мошеннический звонок или сообщение?', category: 'Мошенники', weight: 10 },
  { id: 'q9', text: 'Ограничиваете ли вы лишнюю информацию о себе в соцсетях?', category: 'Приватность', weight: 5 },
  { id: 'q10', text: 'Используете ли вы менеджер паролей?', category: 'Пароли', weight: 5 },
];

const recommendationsMap: Record<string, string> = {
  q1: 'Используйте уникальные пароли для каждого сервиса. Это снижает риск цепного взлома нескольких аккаунтов сразу.',
  q2: 'Включите 2FA в почте, мессенджерах, соцсетях и других важных аккаунтах.',
  q3: 'Регулярно обновляйте ОС, браузер и приложения — обновления часто закрывают уязвимости.',
  q4: 'Используйте базовую защиту устройства, блокировку экрана и проверенные инструменты безопасности.',
  q5: 'Проверяйте адрес сайта и не переходите по подозрительным ссылкам из писем и сообщений.',
  q6: 'Избегайте входа в важные аккаунты и финансовых операций в сомнительных или открытых сетях.',
  q7: 'Делайте резервные копии важных файлов, чтобы снизить ущерб от потери данных или вредоносного ПО.',
  q8: 'Изучите признаки телефонного и текстового мошенничества: срочность, давление, просьбы назвать коды.',
  q9: 'Снизьте объём личной информации в открытом доступе и проверьте настройки приватности.',
  q10: 'Используйте менеджер паролей, чтобы безопасно хранить и создавать надёжные пароли.',
};

export function SecurityChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [current, setCurrent] = useState(0);

  const answeredCount = Object.keys(answers).length;

  const score = useMemo(() => {
    return Object.entries(answers).reduce((sum, [key, value]) => {
      const question = questions.find((q) => q.id === key);
      return sum + (value && question ? question.weight : 0);
    }, 0);
  }, [answers]);

  const weakAreas = useMemo(() => {
    return questions.filter((q) => answers[q.id] === false);
  }, [answers]);

  const recommendations = useMemo(() => {
    return weakAreas.map((q) => recommendationsMap[q.id]);
  }, [weakAreas]);

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrent(0);
  };

  if (showResults) {
    const { color, label } = getSecurityLevel(score);

    return (
      <div className="max-w-3xl mx-auto">
        <Card variant="glow">
          <CardContent>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Результаты проверки</h3>

              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e1e3f" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${score * 2.83} ${283 - score * 2.83}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold" style={{ color }}>
                    {score}
                  </span>
                  <span className="text-sm text-gray-400">из 100</span>
                </div>
              </div>

              <div
                className="inline-flex px-4 py-2 rounded-full border text-sm font-medium mb-4"
                style={{ borderColor: color, color }}
              >
                Уровень: {label}
              </div>

              <p className="text-gray-400 max-w-2xl mx-auto">
                Эта оценка показывает общий уровень базовой цифровой безопасности и помогает
                понять, какие привычки уже работают хорошо, а где есть точки роста.
              </p>
            </div>

            {weakAreas.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Что стоит улучшить</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {weakAreas.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-cyber-border bg-cyber-dark/50 p-4"
                    >
                      <div className="text-xs text-primary-400 mb-2">{item.category}</div>
                      <div className="text-sm text-gray-300">{item.text}</div>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-white mb-4">Рекомендации</h4>
                <ul className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span className="text-yellow-400">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {score === 100 && (
              <div className="text-center p-6 rounded-xl bg-cyber-green/10 border border-cyber-green/20 mb-6">
                <span className="text-4xl block mb-2">🏆</span>
                <p className="text-cyber-green font-semibold">Отличный результат!</p>
                <p className="text-sm text-gray-300 mt-2">
                  У вас уже сформированы очень хорошие базовые привычки цифровой безопасности.
                </p>
              </div>
            )}

            <div className="text-center">
              <Button onClick={reset} variant="outline">
                Пройти снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <Card variant="glow">
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>
                Вопрос {current + 1} из {questions.length}
              </span>
              <span>{progress}%</span>
            </div>

            <div className="w-full h-2 bg-cyber-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-cyber-green rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="inline-flex px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-4">
            {currentQuestion.category}
          </div>

          <h3 className="text-xl font-bold text-white mb-8">{currentQuestion.text}</h3>

          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleAnswer(currentQuestion.id, true)}
              className="w-full"
            >
              Да
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAnswer(currentQuestion.id, false)}
              className="w-full"
            >
              Нет
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
