import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

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
    <Section className="bg-cyber-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-gradient opacity-15" aria-hidden />

      <Container className="relative z-10">
        <SectionHeading
          dense
          badge="После заявки"
          title="Что происходит после отправки формы"
          subtitle="Мы стараемся сделать путь от заявки до старта обучения максимально понятным и спокойным"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-black/20 motion-reduce:transition-none"
            >
              <div className="text-xs font-mono text-primary-300/90 mb-3 tracking-wider">{item.step}</div>
              <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
