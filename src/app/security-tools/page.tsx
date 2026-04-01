import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityChecker } from '@/components/security/SecurityChecker';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Проверка безопасности',
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
          subtitle="Ответьте на вопросы и получите рекомендации по защите аккаунтов, устройств и личных данных"
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Что делает этот инструмент</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Этот инструмент помогает быстро оценить базовый уровень цифровой
              безопасности. Он не заменяет полноценный аудит, но позволяет понять,
              какие привычки уже работают на вашу защиту, а какие стоит улучшить.
            </p>
            <p className="text-gray-300 leading-relaxed">
              После прохождения проверки вы получите ориентировочный результат и
              список рекомендаций, которые можно применить уже сегодня.
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
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">Понятный результат</h3>
            <p className="text-sm text-gray-300">
              Вы увидите ориентировочную оценку уровня безопасности и сможете быстро
              понять, где именно есть слабые места.
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

        <div className="max-w-4xl mx-auto mt-12 text-center rounded-2xl border border-cyber-border bg-cyber-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Хотите разобраться глубже?
          </h2>
          <p className="text-gray-300 mb-6">
            После быстрой самопроверки вы можете изучить материалы блога, выбрать
            подходящий курс или связаться с нами, если хотите подобрать программу
            обучения.
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
