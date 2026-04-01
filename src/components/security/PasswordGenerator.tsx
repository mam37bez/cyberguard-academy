'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function randomChar(chars: string) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function generatePassword(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNumbers: boolean,
  useSymbols: boolean
) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';

  let available = '';
  const passwordChars: string[] = [];

  if (useUpper) {
    available += upper;
    passwordChars.push(randomChar(upper));
  }
  if (useLower) {
    available += lower;
    passwordChars.push(randomChar(lower));
  }
  if (useNumbers) {
    available += numbers;
    passwordChars.push(randomChar(numbers));
  }
  if (useSymbols) {
    available += symbols;
    passwordChars.push(randomChar(symbols));
  }

  if (!available) {
    return '';
  }

  while (passwordChars.length < length) {
    passwordChars.push(randomChar(available));
  }

  return passwordChars
    .sort(() => Math.random() - 0.5)
    .join('')
    .slice(0, length);
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const password = useMemo(() => {
    return generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyPassword = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <Card variant="glow">
        <CardContent>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-3">Генератор паролей</h2>
            <p className="text-gray-300">
              Сгенерируйте надёжный пароль для нового аккаунта или обновления старого.
              Используйте уникальные пароли и по возможности храните их в менеджере паролей.
            </p>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-dark/50 p-5 mb-6">
            <div className="text-sm text-gray-400 mb-2">Сгенерированный пароль</div>
            <div className="break-all text-lg md:text-xl font-mono text-white">
              {password || 'Выберите хотя бы один тип символов'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Длина пароля: {length}
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                />
                Заглавные буквы
              </label>

              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                />
                Строчные буквы
              </label>

              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                />
                Цифры
              </label>

              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                />
                Символы
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="button" variant="primary" size="lg" onClick={copyPassword}>
              {copied ? 'Скопировано' : 'Скопировать пароль'}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setLength(16);
                setUseUpper(true);
                setUseLower(true);
                setUseNumbers(true);
                setUseSymbols(true);
              }}
            >
              Сбросить параметры
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
