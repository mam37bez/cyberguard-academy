import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

const benefits = [
  {
    icon: '🧘',
    title: 'Больше спокойствия',
    description:
      'Родители лучше понимают цифровые риски и чувствуют себя увереннее, когда ребёнок осваивает безопасные привычки в интернете.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Общие правила для семьи',
    description:
      'Обучение помогает выстроить более понятные и здоровые семейные правила: пароли, приватность, осторожность со ссылками и цифровое поведение.',
  },
  {
    icon: '📵',
    title: 'Меньше уязвимости к мошенникам',
    description:
      'Семья лучше распознаёт подозрительные звонки, фишинговые сообщения, опасные ссылки и распространённые схемы цифрового обмана.',
  },
  {
    icon: '📚',
    title: 'Полезные знания для повседневной жизни',
    description:
      'Полученные навыки помогают защищать аккаунты, устройства, данные и увереннее ориентироваться в цифровой среде каждый день.',
  },
];

export function FamilyBenefitsSection() {
  return (
    <Section className="bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          dense
          badge="Что получает семья"
          title="Польза не только для ученика, но и для родителей"
          subtitle="Курс помогает всей семье лучше понимать цифровые риски, выстраивать безопасные привычки и чувствовать себя увереннее в интернете"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-black/20 motion-reduce:transition-none"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
