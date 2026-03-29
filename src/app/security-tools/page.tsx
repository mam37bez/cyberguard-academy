import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityChecker } from '@/components/security/SecurityChecker';
export const metadata = { title: 'Проверка безопасности' };
export default function SecurityToolsPage() {
  return (<div className="pt-24 pb-16"><div className="max-w-7xl mx-auto px-4">
    <SectionHeading badge="Безопасность" title="Проверка кибербезопасности" subtitle="Ответьте на вопросы и получите рекомендации" />
    <SecurityChecker />
  </div></div>);
}
