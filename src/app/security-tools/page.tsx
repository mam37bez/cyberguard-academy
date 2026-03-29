import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityChecker } from '@/components/security/SecurityChecker';

export const metadata: Metadata = {
  title: 'Проверка безопасности',
  description: 'Пройдите проверку кибербезопасности на CyberGuard Academy и получите рекомендации по защите аккаунтов, устройств и личных данных.',
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
          subtitle="Ответьте на вопросы и получите рекомендации"
        />
        <SecurityChecker />
      </div>
    </div>
  );
}
