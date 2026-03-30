'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);

  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  });

  const renderTurnstile = () => {
    if (!SITE_KEY || !window.turnstile || widgetId) return;

    const id = window.turnstile.render('#turnstile-contact', {
      sitekey: SITE_KEY,
      callback: (receivedToken: string) => setToken(receivedToken),
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    });

    setWidgetId(id);
  };

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [e.target.name]: e.target.value }));

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
      const res = await fetch('/api/contact', {
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
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: '',
      });
      setToken('');
      if (window.turnstile && widgetId) window.turnstile.reset(widgetId);
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
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-white mb-4">Отправлено!</h1>
          <p className="text-gray-400 mb-8">Мы свяжемся с вами в течение 24 часов.</p>
          <Button
            onClick={() => {
              setDone(false);
              setError('');
              setToken('');
            }}
            variant="primary"
          >
            Отправить ещё
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
        onLoad={renderTurnstile}
      />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading badge="Контакты" title="Свяжитесь с нами" subtitle="Мы рады помочь" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              {[
                { i: '📍', t: 'Адрес', v: 'г. Минск' },
                { i: '📞', t: 'Телефон', v: '+375 (29) 123-45-67' },
                { i: '📧', t: 'Email', v: 'info@cyberguard.academy' },
                { i: '🕐', t: 'Время', v: 'Пн-Сб: 9-20' },
              ].map((x) => (
                <Card key={x.t} variant="default">
                  <CardContent>
                    <div className="flex gap-4">
                      <span className="text-2xl">{x.i}</span>
                      <div>
                        <div className="text-sm text-gray-500">{x.t}</div>
                        <div className="text-white font-medium">{x.v}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card variant="glow">
                <CardContent>
                  <form onSubmit={sub} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Имя" name="name" value={f.name} onChange={ch} required />
                      <Input label="Email" name="email" type="email" value={f.email} onChange={ch} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Телефон" name="phone" type="tel" value={f.phone} onChange={ch} />
                      <Input label="Тема" name="subject" value={f.subject} onChange={ch} required />
                    </div>

                    <Textarea label="Сообщение" name="message" value={f.message} onChange={ch} rows={5} required />

                    <div id="turnstile-contact" className="pt-2" />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <Button type="submit" size="lg" isLoading={loading} className="w-full">
                      📨 Отправить
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
