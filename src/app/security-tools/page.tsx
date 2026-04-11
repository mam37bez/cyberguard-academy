import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
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

const panel = 'rounded-2xl border border-white/[0.06] bg-cyber-card/90 p-6 md:p-8';
const panelSm = 'rounded-xl border border-white/[0.06] bg-white/[0.02] p-5';

export default function SecurityToolsPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="Безопасность"
          title="Проверка кибербезопасности"
          subtitle="Ответьте на вопросы, проверьте силу пароля и получите рекомендации по защите аккаунтов, устройств и личных данных"
        />

        <div className="max-w-4xl mx-auto mb-10">
          <div className={panel}>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">Что делает этот раздел</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Здесь собраны простые инструменты, которые помогают оценить базовый уровень цифровой безопасности и
              получить практические рекомендации.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Вы можете пройти самопроверку, сгенерировать более надёжный пароль, проверить его силу, оценить
              защищённость устройства, проверить базовую приватность, понять, что делать после подозрительной ссылки
              или файла, а также посмотреть на безопасность семьи и почтового аккаунта.
            </p>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto mb-10 ${panel}`}>
          <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">С чего начать</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Если не уверены, какой инструмент выбрать первым, начните с того сценария, который ближе всего к вашей
            ситуации.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Хочу быстро понять общий уровень</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Начните с общей проверки привычек и посмотрите, где у вас есть слабые места.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Меня волнуют пароли</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Сначала проверьте силу пароля, затем используйте генератор для более надёжных вариантов.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Хочу проверить устройство</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Используйте чеклист безопасности устройства и посмотрите, какие базовые меры защиты уже включены.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Меня беспокоит приватность</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Пройдите privacy checklist и оцените, насколько аккуратно настроены профили, приложения и доступ к
                личным данным.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Я уже открыл подозрительную ссылку</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Перейдите к сценарию после подозрительной ссылки и посмотрите, какие шаги стоит сделать прямо сейчас.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Я скачал подозрительный файл</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Используйте сценарий после подозрительного файла, если вы уже скачивали, открывали или запускали
                сомнительное вложение.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Хочу проверить безопасность семьи</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Откройте Family Security Check, если хотите посмотреть на ситуацию с точки зрения родителей, ребёнка и
                семейных цифровых привычек.
              </p>
            </div>

            <div className={panelSm}>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Хочу проверить почтовый аккаунт</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Mini Email Security Audit поможет быстро проверить базовую защищённость почты — одного из самых важных
                аккаунтов.
              </p>
            </div>
          </div>
        </div>

        <SecurityToolsQuickNav />

        <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <div className={`${panel} !p-6`}>
            <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Проверка привычек</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Вопросы охватывают пароли, 2FA, обновления, защиту устройств, осторожность со ссылками и базовую
              приватность.
            </p>
          </div>

          <div className={`${panel} !p-6`}>
            <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Проверка пароля</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Вы можете быстро оценить пример пароля и увидеть, какие свойства делают его сильнее или слабее.
            </p>
          </div>

          <div className={`${panel} !p-6`}>
            <h3 className="text-base font-semibold text-white mb-2 tracking-tight">Практические советы</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
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

        <div className={`max-w-4xl mx-auto mt-12 ${panel}`}>
          <h2 className="text-xl font-semibold text-white mb-3 text-center tracking-tight">Что изучить дальше</h2>
          <p className="text-slate-500 text-sm mb-8 text-center leading-relaxed max-w-2xl mx-auto">
            Если вам были полезны эти инструменты, следующий шаг — перейти к материалам, которые помогут глубже
            разобраться в теме и выбрать подходящий формат обучения.
          </p>
          <SecurityToolsCTA />
        </div>
      </Container>
    </div>
  );
}
