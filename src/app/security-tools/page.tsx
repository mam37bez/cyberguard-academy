import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityChecker } from '@/components/security/SecurityChecker';
import { PasswordStrengthChecker } from '@/components/security/PasswordStrengthChecker';
import { PasswordGenerator } from '@/components/security/PasswordGenerator';
import { DeviceSecurityChecklist } from '@/components/security/DeviceSecurityChecklist';
import { PrivacyChecklist } from '@/components/security/PrivacyChecklist';
import { SuspiciousLinkGuide } from '@/components/security/SuspiciousLinkGuide';
import { SuspiciousFileGuide } from '@/components/security/SuspiciousFileGuide';
import { FamilySecurityCheck } from '@/components/security/FamilySecurityCheck';
import { EmailSecurityAudit } from '@/components/security/EmailSecurityAudit';
import { AccountRecoveryGuide } from '@/components/security/AccountRecoveryGuide';
import { SecurityToolsCTA } from '@/components/security/SecurityToolsCTA';
import { SecurityToolsQuickNav } from '@/components/security/SecurityToolsQuickNav';
import { InlineContextCTA } from '@/components/security/InlineContextCTA';

export const metadata: Metadata = {
  title: 'Проверка кибербезопасности — CyberGuard Academy',
  description:
    'Пройдите проверку кибербезопасности на CyberGuard Academy и получите рекомендации по защите аккаунтов, устройств и личных данных.',
  alternates: {
    canonical: `${SITE_URL}/security-tools`,
  },
};

export default function SecurityToolsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          as="h1"
          badge="Безопасность"
          title="Проверка кибербезопасности"
          subtitle="Ответьте на вопросы, проверьте силу пароля и получите рекомендации по защите аккаунтов, устройств и личных данных"
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Что делает этот раздел</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Здесь собраны простые инструменты, которые помогают оценить базовый уровень цифровой безопасности и
              получить практические рекомендации.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Вы можете пройти самопроверку, сгенерировать более надёжный пароль, проверить его силу, оценить
              защищённость устройства, проверить базовую приватность, понять, что делать после подозрительной ссылки
              или файла, а также посмотреть на безопасность семьи и почтового аккаунта.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-10 rounded-2xl border border-cyber-border bg-cyber-card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">С чего начать</h2>
          <p className="text-gray-300 mb-6">
            Если не уверены, какой инструмент выбрать первым, начните с того сценария, который ближе всего к вашей
            ситуации.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Хочу быстро понять общий уровень</h3>
              <p className="text-sm text-gray-300">
                Начните с общей проверки привычек и посмотрите, где у вас есть слабые места.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Меня волнуют пароли</h3>
              <p className="text-sm text-gray-300">
                Сначала проверьте силу пароля, затем используйте генератор для более надёжных вариантов.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Хочу проверить устройство</h3>
              <p className="text-sm text-gray-300">
                Используйте чеклист безопасности устройства и посмотрите, какие базовые меры защиты уже включены.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Меня беспокоит приватность</h3>
              <p className="text-sm text-gray-300">
                Пройдите privacy checklist и оцените, насколько аккуратно настроены профили, приложения и доступ к
                личным данным.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Я уже открыл подозрительную ссылку</h3>
              <p className="text-sm text-gray-300">
                Перейдите к сценарию после подозрительной ссылки и посмотрите, какие шаги стоит сделать прямо сейчас.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Я скачал подозрительный файл</h3>
              <p className="text-sm text-gray-300">
                Используйте сценарий после подозрительного файла, если вы уже скачивали, открывали или запускали
                сомнительное вложение.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Хочу проверить безопасность семьи</h3>
              <p className="text-sm text-gray-300">
                Откройте Family Security Check, если хотите посмотреть на ситуацию с точки зрения родителей, ребёнка и
                семейных цифровых привычек.
              </p>
            </div>

            <div className="rounded-xl border border-cyber-border bg-cyber-dark/40 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Хочу проверить почтовый аккаунт</h3>
              <p className="text-sm text-gray-300">
                Mini Email Security Audit поможет быстро проверить базовую защищённость почты — одного из самых важных
                аккаунтов.
              </p>
            </div>
          </div>
        </div>

        <SecurityToolsQuickNav />

        <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6">
            <div className="text-3xl mb-3"> </div>
            <h3 className="text-lg font-semibold text-white mb-2">Проверка привычек</h3>
            <p className="text-sm text-gray-300">
              Вопросы охватывают пароли, 2FA, обновления, защиту устройств, осторожность со ссылками и базовую
              приватность.
            </p>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6">
            <div className="text-3xl mb-3"> </div>
            <h3 className="text-lg font-semibold text-white mb-2">Проверка пароля</h3>
            <p className="text-sm text-gray-300">
              Вы можете быстро оценить пример пароля и увидеть, какие свойства делают его сильнее или слабее.
            </p>
          </div>

          <div className="rounded-2xl border border-cyber-border bg-cyber-card p-6">
            <div className="text-3xl mb-3"> </div>
            <h3 className="text-lg font-semibold text-white mb-2">Практические советы</h3>
            <p className="text-sm text-gray-300">
              Вместо абстрактной оценки вы получите конкретные рекомендации, которые помогут улучшить повседневую
              цифровую безопасность.
            </p>
          </div>
        </div>

        <section id="security-checker" className="scroll-mt-28 mb-12">
          <SecurityChecker />
        </section>

        <section id="password-strength" className="scroll-mt-28 mb-12">
          <PasswordStrengthChecker />
          <InlineContextCTA
            title="Хотите усилить пароли и защитить аккаунты?"
            description="Прочитайте короткий гид по надёжным паролям и посмотрите, какой курс подойдёт вашему уровню."
            primaryHref="/blog/nadezhnye-paroli"
            primaryLabel="Читать про надёжные пароли"
            secondaryHref="/courses"
            secondaryLabel="Подобрать курс"
          />
        </section>

        <section id="password-generator" className="scroll-mt-28 mb-12">
          <PasswordGenerator />
        </section>

        <section id="device-security" className="scroll-mt-28 mb-12">
          <DeviceSecurityChecklist />
        </section>

        <section id="privacy-checklist" className="scroll-mt-28 mb-12">
          <PrivacyChecklist />
        </section>

        <section id="suspicious-link" className="scroll-mt-28 mb-12">
          <SuspiciousLinkGuide />
          <InlineContextCTA
            title="Похоже на мошенничество? Проверьте признаки по статье"
            description="Если был звонок/ссылка “от банка” — вот понятный разбор схем и что делать без паники."
            primaryHref="/blog/kak-raspoznat-moshennikov"
            primaryLabel="Читать статью"
            secondaryHref="/enrollment"
            secondaryLabel="Запросить консультацию"
          />
        </section>

        <section id="suspicious-file" className="scroll-mt-28 mb-12">
          <SuspiciousFileGuide />
        <InlineContextCTA
title="Скачали или открыли подозрительное вложение?"
description="Откройте пошаговый чеклист: что сделать сразу, как защитить почту и аккаунты, и когда нужно действовать жёстче."
primaryHref="/blog/chto-delat-posle-podozritelnogo-fayla"
primaryLabel="Открыть чеклист"
secondaryHref="/enrollment"
secondaryLabel="Запросить консультацию"
/>
</section>

        <section id="family-security" className="scroll-mt-28 mb-12">
          <FamilySecurityCheck />
          <InlineContextCTA
            title="Безопасность детей: следующий шаг для родителей"
            description="Гид с правилами и настройками + курс для родителей, чтобы системно снизить риски."
            primaryHref="/blog/zaschita-detey"
            primaryLabel="Открыть гид для родителей"
            secondaryHref="/courses/cybersecurity-parents"
            secondaryLabel="Курс для родителей"
          />
        </section>

        <section id="email-audit" className="scroll-mt-28 mb-12">
          <EmailSecurityAudit />
        <InlineContextCTA
title="Почта — ключ к аккаунтам. Проверьте мини‑аудит за 15 минут"
description="Короткий чеклист: 2FA, сессии, восстановление, правила пересылки и доступы. Подходит для Gmail/Outlook/Яндекс/Mail.ru."
primaryHref="/blog/kak-zaschitit-pochtu-mini-audit"
primaryLabel="Открыть мини‑аудит"
secondaryHref="/security-tools#password-strength"
secondaryLabel="Проверить пароль"
/>
</section>

        <section id="account-recovery" className="scroll-mt-28">
          <AccountRecoveryGuide />
        <InlineContextCTA
title="Подозрительный вход? Проверьте 10‑минутный чеклист"
description="Если вы увидели уведомление о входе, которого не было, выполните быстрые шаги: пароль, 2FA, сессии и проверка почты."
primaryHref="/blog/podozritelnyy-vkhod-10-minut"
primaryLabel="Открыть чеклист"
secondaryHref="/security-tools#email-audit"
secondaryLabel="Проверить почту"
/>
</section>

        <div className="max-w-4xl mx-auto mt-12 rounded-2xl border border-cyber-border bg-cyber-card p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Что изучить дальше</h2>
          <p className="text-gray-300 mb-8 text-center">
            Если вам были полезны эти инструменты, следующий шаг — перейти к материалам, которые помогут глубже
            разобраться в теме и выбрать подходящий формат обучения.
          </p>
          <SecurityToolsCTA />
        </div>
      </div>
    </div>
  );
}
