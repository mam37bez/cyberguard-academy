import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

const items = [
  {
    icon: '🛡️',
    title: 'Практический фокус',
    description:
      'Мы объясняем реальные цифровые риски и даём понятные шаги, которые можно применять в повседневной жизни.',
  },
  {
    icon: '🎓',
    title: 'Понятный формат обучения',
    description:
      'Материалы и курсы адаптированы для детей, подростков и родителей без перегрузки сложными терминами.',
  },
  {
    icon: '⚖️',
    title: 'White Hat подход',
    description:
      'Мы учим защите аккаунтов, устройств и данных, а не романтизируем вредоносные сценарии и опасные практики.',
  },
  {
    icon: '🚀',
    title: 'Актуальные темы',
    description:
      'Фишинг, мошенничество, безопасность смартфона, 2FA, защита детей, пароли и другие реальные угрозы современного интернета.',
  },
];

export function WhyUsSection() {
  return (
    <Section className="bg-cyber-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-25" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          dense
          badge="Почему выбирают нас"
          title="Обучение, которое помогает в реальной жизни"
          subtitle="Мы делаем кибербезопасность понятной, практичной и полезной для всей семьи"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((item) => (
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
