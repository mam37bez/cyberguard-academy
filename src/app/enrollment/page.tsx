'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { courses } from '@/data/courses';

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const SITE_KEY = '0x4AAAAAACyDT_0NEyBK5SxM';

export default function EnrollmentPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const [f, setF] = useState({
    pn: '',
    pe: '',
    pp: '',
    cn: '',
    ca: '',
    ci: '',
    agree: false,
    website: '',
  });

  useEffect(() => {
    if (!scriptReady || !SITE_KEY || widgetId) return;

    let attempts = 0;
    const maxAttempts = 20;

    const timer = setInterval(() => {
      const container = document.getElementById('turnstile-enrollment');

      if (window.turnstile && container && !widgetId) {
        const id = window.turnstile.render(container, {
          sitekey: SITE_KEY,
          callback: (receivedToken: string) => setToken(receivedToken),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
        setWidgetId(id);
        clearInterval(timer);
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [scriptReady, widgetId]);

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setF((p) => ({
      ...p,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const sub = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!token) {
      setError('Подтвердите, что вы не бот.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, turnstileToken: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка отправки формы');
        setLoading(false);
        return;
      }

      setDone(true);
      setF({
        pn: '',
        pe: '',
        pp: '',
        cn: '',
        ca: '',
        ci: '',
        agree: false,
        website: '',
      });
      setToken('');

      if (window.turnstile && widgetId) {
        window.turnstile.reset(widgetId);
      }
    } catch {
      setError('Не удалось отправить форму. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-4">Заявка отправлена!</h1>
          <p className="text-gray-400 mb-8">Перезвоним в течение 24 часов.</p>
          <Button
            onClick={() => {
              setDone(false);
              setError('');
              setToken('');
            }}
            variant="primary"
          >
            Ещё
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading badge="Запись" title="Записаться" subtitle="Заполните форму" />

          <Card variant="glow">
            <CardContent>
              <form onSubmit={sub} className="space-y-8">
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    value={f.website}
                    onChange={ch}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Родитель</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="ФИО" name="pn" value={f.pn} onChange={ch} required />
                    <Input label="Email" name="pe" type="email" value={f.pe} onChange={ch} required />
                  </div>
                  <div className="mt-4">
                    <Input label="Телефон" name="pp" type="tel" value={f.pp} onChange={ch} required />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Ученик</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Имя" name="cn" value={f.cn} onChange={ch} required />
                    <Input label="Возраст" name="ca" value={f.ca} onChange={ch} required />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Курс</h3>
                  <select
                    name="ci"
                    value={f.ci}
                    onChange={ch}
                    required
                    className="w-full rounded-xl bg-cyber-dark border border-cyber-border px-4 py-3 text-white focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Выберите...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={f.agree}
                    onChange={ch}
                    required
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-400">Согласен на обработку данных</span>
                </label>

                <div id="turnstile-enrollment" className="pt-2 min-h-[70px]" />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button type="submit" size="lg" isLoading={loading} className="w-full">
                  Отправить
                </Button>

                <p className="text-center text-sm text-gray-500">Пробное занятие — бесплатно!</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
