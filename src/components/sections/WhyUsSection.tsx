import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

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
    <section className="py-24 bg-cyber-dark relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-30" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Почему выбирают нас"
          title="Обучение, которое помогает в реальной жизни"
          subtitle="Мы делаем кибербезопасность понятной, практичной и полезной для всей семьи"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
