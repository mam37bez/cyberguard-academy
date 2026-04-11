'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { fieldControlClass, fieldLabelClass } from '@/lib/field-styles';
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
    branch: '',
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
        branch: '',
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
        <Container className="max-w-2xl">
          <div className="rounded-2xl border border-white/[0.08] bg-cyber-card/90 p-8 md:p-10 text-center shadow-xl shadow-black/20">
            <div className="text-5xl mb-5" aria-hidden>
              🎉
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">Заявка отправлена</h1>
            <p className="text-slate-400 mb-3 leading-relaxed">
              Мы получили вашу заявку и свяжемся с вами в течение 24 часов.
            </p>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Пока вы ждёте ответ, можно посмотреть курсы, открыть FAQ или изучить полезные материалы по кибербезопасности.
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
              Отправить ещё одну заявку
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
        <Container className="max-w-2xl">
          <SectionHeading
            dense
            badge="Запись"
            title="Записаться на обучение"
            subtitle="Заполните форму, и мы поможем выбрать подходящую программу"
          />

          <Card variant="glow" className="border-white/[0.06]">
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
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">Родитель</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <Input label="ФИО" name="pn" value={f.pn} onChange={ch} required autoComplete="name" />
                    <Input label="Email" name="pe" type="email" value={f.pe} onChange={ch} required autoComplete="email" />
                  </div>
                  <div className="mt-4">
                    <Input label="Телефон" name="pp" type="tel" value={f.pp} onChange={ch} required autoComplete="tel" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-4">Ученик</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <Input label="Имя" name="cn" value={f.cn} onChange={ch} required />
                    <Input label="Возраст" name="ca" value={f.ca} onChange={ch} required />
                  </div>
                </div>

                <div>
                  <label htmlFor="enrollment-course" className={fieldLabelClass}>
                    Курс
                  </label>
                  <select
                    id="enrollment-course"
                    name="ci"
                    value={f.ci}
                    onChange={ch}
                    required
                    className={fieldControlClass()}
                  >
                    <option value="">Выберите...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="enrollment-branch" className={fieldLabelClass}>
                    Филиал
                  </label>
                  <select
                    id="enrollment-branch"
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

                <label className="flex gap-3 cursor-pointer rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/10 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary-500/40">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={f.agree}
                    onChange={ch}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-cyber-darker text-primary-500 focus:ring-primary-500/50 focus:ring-offset-0 focus:ring-offset-transparent"
                  />
                  <span className="text-sm text-slate-500 leading-relaxed">
                    Согласен на обработку данных в соответствии с{' '}
                    <Link
                      href="/privacy"
                      className="text-primary-400/90 hover:text-primary-300 underline underline-offset-2"
                    >
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>

                <div id="turnstile-enrollment" className="pt-2 min-h-[70px]" />

                {error && <p className="text-rose-400 text-sm">{error}</p>}

                <Button type="submit" size="lg" isLoading={loading} className="w-full">
                  Отправить
                </Button>

                <p className="text-center text-xs text-slate-600">Пробное занятие — бесплатно.</p>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}
