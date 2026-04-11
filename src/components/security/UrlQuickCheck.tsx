'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { track } from '@vercel/analytics';

const SHORTENER_HINTS = [
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'ow.ly',
  'buff.ly',
  'cutt.ly',
  'rebrand.ly',
];

function tryParseUrl(raw: string): URL | null {
  const t = raw.trim();
  if (!t) return null;
  try {
    return new URL(t);
  } catch {
    try {
      return new URL(`https://${t}`);
    } catch {
      return null;
    }
  }
}

function analyze(url: URL): { type: 'info' | 'warn' | 'danger'; text: string }[] {
  const notes: { type: 'info' | 'warn' | 'danger'; text: string }[] = [];
  const host = url.hostname.toLowerCase();

  if (url.protocol === 'http:') {
    notes.push({
      type: 'warn',
      text: 'Используется HTTP без шифрования — данные могут перехватываться в сети. Для входа в аккаунты и оплаты нужен HTTPS.',
    });
  }

  if (url.username || url.password) {
    notes.push({
      type: 'danger',
      text: 'В ссылке есть логин/пароль (userinfo) — частый приём обмана. Не вводите данные на таких страницах.',
    });
  }

  if (host.includes('@')) {
    notes.push({ type: 'danger', text: 'Подозрительная форма хоста — не переходите и не доверяйте адресу.' });
  }

  const ipV4 = /^\d{1,3}(\.\d{1,3}){3}$/;
  if (ipV4.test(host) || host.includes(':')) {
    notes.push({
      type: 'warn',
      text: 'Ссылка ведёт на IP-адрес, а не на обычное имя сайта. Банки и крупные сервисы редко так делают в письмах клиентам.',
    });
  }

  if (host.startsWith('xn--')) {
    notes.push({
      type: 'warn',
      text: 'Домен в punycode (xn--…). Иногда так маскируют похожие на известные бренды адреса — сравните с официальным доменом буква к букве.',
    });
  }

  const parts = host.split('.');
  if (parts.length > 4) {
    notes.push({
      type: 'info',
      text: 'Длинная цепочка поддоменов — не всегда опасно, но чаще встречается в фишинге. Проверьте основной домен (две последние части, например example.com).',
    });
  }

  const mainDomain = parts.slice(-2).join('.');
  if (SHORTENER_HINTS.some((s) => host === s || host.endsWith(`.${s}`))) {
    notes.push({
      type: 'warn',
      text: 'Сокращатель ссылок скрывает конечный адрес. Откройте сервис только если доверяете отправителю; лучше зайти на сайт вручную.',
    });
  }

  const suspiciousKw = ['login', 'verify', 'secure', 'account', 'update', 'confirm', 'banking', 'signin'];
  const pathAndSearch = (url.pathname + url.search).toLowerCase();
  const hits = suspiciousKw.filter((k) => pathAndSearch.includes(k));
  if (hits.length >= 2) {
    notes.push({
      type: 'info',
      text: `В пути или параметрах много «чувствительных» слов (${hits.slice(0, 4).join(', ')}). Сравните с официальным сайтом сервиса.`,
    });
  }

  if (url.port && url.port !== '80' && url.port !== '443') {
    notes.push({
      type: 'info',
      text: `Нестандартный порт :${url.port}. Убедитесь, что это ожидаемо для данного сервиса.`,
    });
  }

  if (notes.length === 0) {
    notes.push({
      type: 'info',
      text: 'Явных признаков обмана в структуре ссылки не найдено — это не гарантия безопасности. Фишинг может выглядеть «чисто».',
    });
  }

  return notes;
}

type SbState =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'clean'; message: string }
  | { phase: 'threat'; message: string; threats: string[] }
  | { phase: 'error'; message: string };

export function UrlQuickCheck() {
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<URL | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sb, setSb] = useState<SbState>({ phase: 'idle' });

  const notes = useMemo(() => (parsed ? analyze(parsed) : []), [parsed]);

  const runCheck = () => {
    const u = tryParseUrl(input);
    if (!u) {
      setParsed(null);
      setSb({ phase: 'idle' });
      setError('Не удалось разобрать ссылку. Вставьте адрес целиком, например https://example.com/path');
      return;
    }
    setError(null);
    setParsed(u);
    setSb({ phase: 'idle' });
    track('url_quick_check', { host: u.hostname.slice(0, 80) });
  };

  const runSafeBrowsing = async () => {
    if (!parsed) return;
    setSb({ phase: 'loading' });
    try {
      const res = await fetch('/api/safe-browsing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: parsed.href }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        status?: string;
        message?: string;
        threats?: string[];
        error?: string;
        code?: string;
      };

      if (res.status === 429) {
        setSb({ phase: 'error', message: data.error || 'Слишком много запросов. Попробуйте через час.' });
        track('url_safe_browsing', { result: 'rate_limited' });
        return;
      }

      if (!data.ok) {
        setSb({
          phase: 'error',
          message: data.error || 'Проверка недоступна.',
        });
        track('url_safe_browsing', { result: 'error', code: data.code || 'unknown' });
        return;
      }

      if (data.status === 'clean') {
        setSb({ phase: 'clean', message: data.message || 'Совпадений не найдено.' });
        track('url_safe_browsing', { result: 'clean' });
        return;
      }

      if (data.status === 'threat' && data.threats?.length) {
        setSb({
          phase: 'threat',
          message: data.message || 'Обнаружены совпадения.',
          threats: data.threats,
        });
        track('url_safe_browsing', { result: 'threat' });
        return;
      }

      setSb({ phase: 'error', message: 'Неожиданный ответ сервера.' });
      track('url_safe_browsing', { result: 'unexpected' });
    } catch {
      setSb({ phase: 'error', message: 'Сеть недоступна. Попробуйте позже.' });
      track('url_safe_browsing', { result: 'network' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <h2 className="text-2xl font-bold text-white mb-3">Быстрый разбор ссылки</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-2">
            Вставьте ссылку из SMS, мессенджера или письма. Кнопка «Разобрать» анализирует адрес{' '}
            <strong className="text-slate-300">только в браузере</strong> — без перехода по ссылке. Ниже можно
            дополнительно запросить проверку через{' '}
            <strong className="text-slate-300">Google Safe Browsing</strong> на нашем сервере (адрес уходит к Google).
          </p>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Это не гарантия безопасности: часть угроз может отсутствовать в базах. Не переходите по ссылке, если
            сомневаетесь — лучше открыть сервис вручную.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://… или example.com/path"
              className="min-w-0 flex-1 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-primary-500/45 focus:outline-none focus:ring-2 focus:ring-primary-500/25"
              autoComplete="off"
              spellCheck={false}
            />
            <Button type="button" variant="primary" className="shrink-0" onClick={runCheck}>
              Разобрать
            </Button>
          </div>

          {error && <p className="mt-4 text-sm text-amber-400">{error}</p>}

          {parsed && (
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm">
                <p className="text-slate-500 mb-1">Хост (домен)</p>
                <p className="font-mono text-primary-200 break-all">{parsed.hostname}</p>
                <p className="text-slate-500 mt-3 mb-1">Полный адрес</p>
                <p className="font-mono text-slate-300 text-xs break-all">{parsed.href}</p>
              </div>

              <ul className="space-y-2">
                {notes.map((n, i) => (
                  <li
                    key={i}
                    className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${
                      n.type === 'danger'
                        ? 'border-red-500/35 bg-red-500/10 text-red-100'
                        : n.type === 'warn'
                          ? 'border-amber-500/35 bg-amber-500/10 text-amber-50'
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-300'
                    }`}
                  >
                    {n.text}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-4">
                <p className="text-sm font-medium text-white mb-2">Проверка Google Safe Browsing (v4)</p>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  Запрос уходит на сервер CyberGuard Academy, затем в Google. Не более 30 проверок в час с одного IP.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  disabled={sb.phase === 'loading'}
                  onClick={runSafeBrowsing}
                >
                  {sb.phase === 'loading' ? 'Проверяем…' : 'Проверить в Safe Browsing'}
                </Button>

                {sb.phase === 'clean' && (
                  <p className="mt-3 text-sm text-emerald-300/95 leading-relaxed">{sb.message}</p>
                )}
                {sb.phase === 'threat' && (
                  <div className="mt-3 rounded-lg border border-red-500/35 bg-red-500/10 p-3 text-sm text-red-100">
                    <p className="mb-2 font-medium">Обнаружены совпадения</p>
                    <p className="mb-2 leading-relaxed">{sb.message}</p>
                    <ul className="list-disc pl-5 text-red-100/90">
                      {sb.threats.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {sb.phase === 'error' && (
                  <p className="mt-3 text-sm text-amber-400 leading-relaxed">{sb.message}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
