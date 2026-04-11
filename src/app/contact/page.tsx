'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { fieldControlClass, fieldLabelClass } from '@/lib/field-styles';

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
        <Container className="max-w-2xl">
          <div className="rounded-2xl border border-white/[0.08] bg-cyber-card/90 p-8 md:p-10 text-center shadow-xl shadow-black/20">
            <div className="text-5xl mb-5" aria-hidden>
              ✓
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">Сообщение отправлено</h1>
            <p className="text-slate-400 mb-3 leading-relaxed">
              Мы получили ваше обращение и свяжемся с вами в течение 24 часов.
            </p>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Пока вы ждёте ответ, можете посмотреть курсы, изучить ответы на частые вопросы или почитать материалы по
              кибербезопасности.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8">
              <ButtonLink href="/courses" variant="primary" size="lg">
                Смотреть курсы
              </ButtonLink>
              <ButtonLink href="/faq" variant="outline" size="lg">
                Открыть FAQ
              </ButtonLink>
              <ButtonLink href="/blog" variant="ghost" size="lg">
                Читать блог
              </ButtonLink>
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
        </Container>
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
        <Container>
          <SectionHeading
            dense
            badge="Контакты"
            title="Свяжитесь с нами"
            subtitle="Мы рады помочь, ответить на вопросы и подсказать подходящую программу"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
            <div className="space-y-4">
              {[
                { i: '📍', t: 'Основная локация', v: 'г. Минск' },
                { i: '📞', t: 'Телефон', v: 'Уточняйте через форму' },
                { i: '✉️', t: 'Email', v: 'Уточняйте через форму' },
                { i: '🕒', t: 'Время', v: 'Пн-Сб: 9-20' },
              ].map((x) => (
                <Card key={x.t} variant="default" className="border-white/[0.06]">
                  <CardContent>
                    <div className="flex gap-3">
                      <span className="text-xl opacity-90" aria-hidden>
                        {x.i}
                      </span>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{x.t}</div>
                        <div className="text-white text-sm font-medium mt-0.5">{x.v}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-2">
              <Card variant="glow" className="border-white/[0.06]">
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
                      <label htmlFor="contact-branch" className={fieldLabelClass}>
                        Филиал для обращения
                      </label>
                      <select
                        id="contact-branch"
                        name="branch"
                        value={f.branch}
                        onChange={ch}
                        required
                        className={fieldControlClass()}
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

                    {error && <p className="text-rose-400 text-sm">{error}</p>}

                    <Button type="submit" size="lg" isLoading={loading} className="w-full">
                      Отправить
                    </Button>

                    <p className="text-center text-xs text-slate-600 leading-relaxed">
                      Отправляя сообщение, вы соглашаетесь с{' '}
                      <Link
                        href="/privacy"
                        className="text-primary-400/90 hover:text-primary-300 underline underline-offset-2"
                      >
                        политикой конфиденциальности
                      </Link>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-14 md:mt-20 pt-12 border-t border-white/[0.06]">
            <SectionHeading
              dense
              badge="Наши локации"
              title="Где нас можно найти"
              subtitle="Актуальные адреса филиалов и площадок. Если данных недостаточно, уточняйте детали через форму выше."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {locations.map((location) => (
                <Card key={location.city + location.address} variant="default" className="border-white/[0.06]">
                  <CardContent>
                    <div className="text-xl mb-3 opacity-90" aria-hidden>
                      📍
                    </div>
                    <h3 className="text-base font-semibold text-white mb-4 tracking-tight">{location.city}</h3>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Адрес</div>
                        <div className="text-slate-400 leading-relaxed">{location.address}</div>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Телефон</div>
                        <div className="text-slate-400">
                          {location.phone ? (
                            <a
                              href={`tel:${location.phone}`}
                              className="hover:text-white underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 rounded"
                            >
                              {location.phoneLabel}
                            </a>
                          ) : (
                            location.phoneLabel
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Email</div>
                        <div className="text-slate-400 break-all">
                          {location.email ? (
                            <a
                              href={`mailto:${location.email}`}
                              className="hover:text-white underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 rounded"
                            >
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
          </div>
        </Container>
      </div>
    </>
  );
}
