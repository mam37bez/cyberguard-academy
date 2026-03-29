'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  });

  const ch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [e.target.name]: e.target.value }));

  const sub = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
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
              setF({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                website: '',
              });
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

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

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
  );
}
