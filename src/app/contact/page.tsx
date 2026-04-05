'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

const SITE_KEY = '0x4AAAAAACyDT_0NEyBK5SxM';

const locations = [
  {
    city: 'Минск (основная)',
    address: 'ул. Аэродромная, 125',
    phone: null,
    phoneLabel: 'Уточняйте через форму',
    email: null,
    emailLabel: 'Уточняйте через форму',
  },
  {
    city: 'Минск / Arena City',
    address: 'Пр. Победителей, 84, Arena City (2-й этаж)',
    phone: null,
    phoneLabel: 'Уточняйте через форму',
    email: null,
    emailLabel: 'Уточняйте через форму',
  },
  {
    city: 'Гродно',
    address: 'ул. 17 сентября, 49А / ул. Титова, 14',
    phone: '+375297398588',
    phoneLabel: '+375-29-739-85-88',
    email: 'grodno@kiber-one.com',
    emailLabel: 'grodno@kiber-one.com',
  },
  {
    city: 'Брест',
    address: 'ул. Советская, 85 / ул. Варшавское шоссе, 43',
    phone: '+375297652250',
    phoneLabel: '+375-29-765-22-50',
    email: 'brest@kiber-one.com',
    emailLabel: 'brest@kiber-one.com',
  },
  {
    city: 'Борисов',
    address: 'ул. Строителей, 26',
    phone: '+375296332779',
    phoneLabel: '+375 29 633-27-79',
    email: null,
    emailLabel: 'Уточняйте через форму',
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    branch: '',
    website: '',
  });

  useEffect(() => {
    if (!scriptReady || !SITE_KEY || widgetId) return;

    let attempts = 0;
    const maxAttempts = 20;

    const timer = setInterval(() => {
      const container = document.getElementById('turnstile-contact');

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

  const ch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        branch: '',
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
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-8 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-white mb-4">Сообщение отправлено!</h1>
            <p className="text-gray-300 mb-4">
              Мы получили ваше обращение и свяжемся с вами в течение 24 часов.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Пока вы ждёте ответ, можете посмотреть курсы, изучить ответы на частые
              вопросы или почитать материалы по кибербезопасности.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/courses">
                <Button variant="primary" size="lg">
                  Смотреть курсы
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline" size="lg">
                  Открыть FAQ
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="ghost" size="lg">
                  Читать блог
                </Button>
              </Link>
            </div>

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
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            badge="Контакты"
            title="Свяжитесь с нами"
            subtitle="Мы рады помочь, ответить на вопросы и подсказать подходящую программу"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              {[
                { i: '📍', t: 'Основная локация', v: 'г. Минск' },
                { i: '📞', t: 'Телефон', v: 'Уточняйте через форму' },
                { i: '✉️', t: 'Email', v: 'Уточняйте через форму' },
                { i: '🕒', t: 'Время', v: 'Пн-Сб: 9-20' },
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
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={f.email}
                        onChange={ch}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Телефон" name="phone" type="tel" value={f.phone} onChange={ch} />
                      <Input label="Тема" name="subject" value={f.subject} onChange={ch} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Филиал для обращения
                      </label>
                      <select
                        name="branch"
                        value={f.branch}
                        onChange={ch}
                        required
                        className="w-full rounded-xl bg-cyber-dark border border-cyber-border px-4 py-3 text-white focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Выберите филиал...</option>
                        <option value="grodno">Гродно</option>
                        <option value="brest">Брест</option>
                      </select>
                    </div>

                    <Textarea
                      label="Сообщение"
                      name="message"
                      value={f.message}
                      onChange={ch}
                      rows={5}
                      required
                    />

                    <div id="turnstile-contact" className="pt-2 min-h-[70px]" />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <Button type="submit" size="lg" isLoading={loading} className="w-full">
                      Отправить
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                      Отправляя сообщение, вы соглашаетесь с{' '}
                      <Link href="/privacy" className="text-primary-400 hover:text-primary-300 underline">
                        политикой конфиденциальности
                      </Link>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <section>
            <SectionHeading
              badge="Наши локации"
              title="Где нас можно найти"
              subtitle="Актуальные адреса филиалов и площадок. Если данных недостаточно, уточняйте детали через форму выше."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {locations.map((location) => (
                <Card key={location.city + location.address} variant="default">
                  <CardContent>
                    <div className="text-2xl mb-3">📍</div>
                    <h3 className="text-lg font-semibold text-white mb-3">{location.city}</h3>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Адрес</div>
                        <div className="text-gray-300">{location.address}</div>
                      </div>

                      <div>
                        <div className="text-gray-500 mb-1">Телефон</div>
                        <div className="text-gray-300">
                          {location.phone ? (
                            <a href={`tel:${location.phone}`} className="hover:text-white underline">
                              {location.phoneLabel}
                            </a>
                          ) : (
                            location.phoneLabel
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-gray-500 mb-1">Email</div>
                        <div className="text-gray-300 break-all">
                          {location.email ? (
                            <a href={`mailto:${location.email}`} className="hover:text-white underline">
                              {location.emailLabel}
                            </a>
                          ) : (
                            location.emailLabel
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
