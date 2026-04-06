import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityChecker } from '@/components/security/SecurityChecker';
import { PasswordStrengthChecker } from '@/components/security/PasswordStrengthChecker';
import { PasswordGenerator } from '@/components/security/PasswordGenerator';
import { DeviceSecurityChecklist } from '@/components/security/DeviceSecurityChecklist';
import { PrivacyChecklist } from '@/components/security/PrivacyChecklist';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Проверка кибербезопасности — CyberGuard Academy',
  description:
    'Пройдите проверку кибербезопасности на CyberGuard Academy и получите рекомендации по защите аккаунтов, устройств и личных данных.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/security-tools',
  },
};

export default function SecurityToolsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Безопасность"
          title="Проверка кибербезопасности"
          subtitle="Ответьте на вопросы, проверьте силу пароля и получите рекомендации по защите аккаунтов, устройств и личных данных"
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Что делает этот раздел</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Здесь собраны простые инструменты, которые помогают оценить базовый
              уровень цифровой безопасности и получить практические рекомендации.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Вы можете пройти самопроверку, сгенерировать более надёжный пароль,
              проверить его силу, оценить защищённость устройства и проверить
              базовые настройки цифровой приватности.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="text-lg font-semibold text-white mb-2">Проверка привычек</h3>
            <p className="text-sm text-gray-300">
              Вопросы охватывают пароли, 2FA, обновления, защиту устройств,
              осторожность со ссылками и базовую приватность.
            </p>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6">
            <div className="text-3xl mb-3">🧪</div>
            <h3 className="text-lg font-semibold text-white mb-2">Проверка пароля</h3>
            <p className="text-sm text-gray-300">
              Вы можете быстро оценить пример пароля и увидеть, какие свойства делают
              его сильнее или слабее.
            </p>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="text-lg font-semibold text-white mb-2">Практические советы</h3>
            <p className="text-sm text-gray-300">
              Вместо абстрактной оценки вы получите конкретные рекомендации, которые
              помогут улучшить повседневую цифровую безопасность.
            </p>
          </div>
        </div>

        <SecurityChecker />
        <PasswordStrengthChecker />
        <PasswordGenerator />
        <DeviceSecurityChecklist />
        <PrivacyChecklist />

        <div className="max-w-4xl mx-auto mt-12 text-center rounded-2xl border border-cyber-border bg-cyber-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Хотите разобраться глубже?
          </h2>
          <p className="text-gray-300 mb-6">
            После самопроверки вы можете изучить материалы блога, выбрать подходящий
            курс или связаться с нами, если хотите подобрать программу обучения.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Читать блог
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="primary" size="lg">
                Смотреть курсы
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
