import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Мы получаем заявку',
    description:
      'После отправки формы заявка попадает к нам, и мы видим выбранный филиал, курс и ваши контактные данные.',
  },
  {
    step: '02',
    title: 'Связываемся с вами',
    description:
      'Обычно мы отвечаем в течение 24 часов, чтобы уточнить детали, ответить на вопросы и помочь с выбором программы.',
  },
  {
    step: '03',
    title: 'Подбираем следующий шаг',
    description:
      'Вместе определяем, подходит ли курс, как лучше стартовать и нужен ли сначала формат пробного занятия.',
  },
  {
    step: '04',
    title: 'Помогаем начать обучение',
    description:
      'После согласования деталей вы получаете понятный путь к старту: от организационных шагов до начала обучения.',
  },
];

export function AfterSubmissionSection() {
  return (
    <section className="py-24 bg-cyber-darker relative">
      <div className="absolute inset-0 bg-glow-gradient opacity-20" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          badge="После заявки"
          title="Что происходит после отправки формы"
          subtitle="Мы стараемся сделать путь от заявки до старта обучения максимально понятным и спокойным"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-cyber-border bg-cyber-card p-6 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className="text-sm font-mono text-cyber-green mb-3">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
