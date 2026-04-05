import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const benefits = [
  {
    icon: '🔐',
    title: 'Навыки цифровой безопасности',
    description:
      'Ученик начинает лучше понимать, как защищать аккаунты, устройства и личные данные в интернете.',
  },
  {
    icon: '🧠',
    title: 'Критическое мышление',
    description:
      'Формируется привычка замечать подозрительные сообщения, ссылки, просьбы и цифровые риски до того, как они приведут к проблеме.',
  },
  {
    icon: '🛡️',
    title: 'Больше уверенности в интернете',
    description:
      'Ребёнок или подросток чувствует себя спокойнее в цифровой среде и лучше понимает, как действовать безопасно.',
  },
  {
    icon: '🚀',
    title: 'Полезная база на будущее',
    description:
      'Обучение формирует важные привычки и знания, которые пригодятся и в повседневной жизни, и в дальнейшем развитии.',
  },
];

export function StudentBenefitsSection() {
  return (
    <section className="py-24 bg-cyber-dark relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-20" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Что получает ученик"
          title="Полезный результат уже в процессе обучения"
          subtitle="Мы делаем акцент не только на знаниях, но и на практических привычках, внимательности и уверенности в цифровой среде"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => (
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
