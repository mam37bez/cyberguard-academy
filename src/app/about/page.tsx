import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Card, CardContent } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'О CyberGuard Academy — миссия и ценности',
  description:
    'Узнайте больше о CyberGuard Academy: миссия, ценности, преподаватели и подход к обучению кибербезопасности для детей, подростков и родителей.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="О нас"
          title="CyberGuard Academy"
          subtitle="Мы учим защищать, а не атаковать."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 tracking-tight">Миссия</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Дать детям, подросткам и взрослым практические знания для защиты в цифровом мире.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Мы придерживаемся подхода White Hat: объясняем угрозы, учим безопасному поведению и развиваем цифровую
              грамотность без романтизации атакующих практик.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { i: '🛡️', t: 'Защита', d: 'Обучаем защите аккаунтов, данных и устройств' },
              { i: '🎓', t: 'Образование', d: 'Программы для детей, подростков и родителей' },
              { i: '⚖️', t: 'Этика', d: 'White Hat и ответственное отношение к знаниям' },
              { i: '🌍', t: 'Доступность', d: 'Понятный язык и практический подход' },
            ].map((x) => (
              <Card key={x.t} variant="default" className="border-white/[0.06]">
                <CardContent>
                  <div className="text-2xl mb-2">{x.i}</div>
                  <h3 className="font-semibold text-white text-sm mb-1 tracking-tight">{x.t}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{x.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary-950/40 to-cyber-card border border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { v: '4', l: 'Программы обучения' },
              { v: '160+', l: 'Учебных часов' },
              { v: '4', l: 'Направления' },
              { v: '100%', l: 'Фокус на защите' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary-200 to-cyber-blue bg-clip-text text-transparent mb-1 tabular-nums">
                  {s.v}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
