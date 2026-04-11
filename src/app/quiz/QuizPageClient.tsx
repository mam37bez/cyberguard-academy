'use client';

import Link from 'next/link';
import { modules } from '@/data/modules';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';

export function QuizPageClient() {
  return (
    <div className="min-h-screen bg-cyber-darker text-white py-16 md:py-20">
      <Container className="max-w-6xl">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-400/90 mb-3">Практика</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Интерактивные{' '}
            <span className="bg-gradient-to-r from-primary-300 to-cyber-blue bg-clip-text text-transparent">квизы</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Проверьте знания по кибербезопасности: выберите модуль и ответьте на вопросы с пояснениями.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.4),
                ease: 'easeOut',
              }}
              whileHover={{ y: -2 }}
              className="motion-reduce:transform-none"
            >
              <Link
                href={`/quiz/${module.id}`}
                className="group relative flex flex-col h-full rounded-2xl p-6 bg-cyber-card border border-cyber-border hover:border-primary-500/35 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
              >
                <div className="text-4xl sm:text-5xl mb-4 opacity-95 group-hover:scale-[1.03] transition-transform duration-300 motion-reduce:transform-none">
                  {module.icon}
                </div>

                <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-200 transition-colors">
                  {module.title}
                </h2>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">{module.description}</p>

                <div className="flex items-center gap-3 text-xs flex-wrap">
                  <span
                    className={`px-2.5 py-1 rounded-full font-medium border ${
                      module.difficulty === 'beginner'
                        ? 'bg-emerald-500/10 text-emerald-300/95 border-emerald-500/20'
                        : module.difficulty === 'intermediate'
                          ? 'bg-amber-500/10 text-amber-200/90 border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-200/90 border-rose-500/20'
                    }`}
                  >
                    {module.difficulty === 'beginner' && 'Начальный'}
                    {module.difficulty === 'intermediate' && 'Средний'}
                    {module.difficulty === 'advanced' && 'Продвинутый'}
                  </span>

                  <span className="text-slate-600">{module.estimatedTime}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <p className="text-slate-500 text-sm">{module.questions.length} вопросов</p>
                  <span className="text-slate-600 group-hover:text-primary-400 transition-colors text-lg" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {[
            { v: String(modules.length), l: 'Модулей' },
            {
              v: String(modules.reduce((sum, m) => sum + m.questions.length, 0)),
              l: 'Вопросов',
            },
            {
              v: `${Math.round(
                modules.reduce((sum, m) => {
                  const time = parseInt(m.estimatedTime, 10);
                  return sum + (Number.isNaN(time) ? 20 : time);
                }, 0) / 60,
              )} ч`,
              l: 'Материала',
            },
            { v: '∞', l: 'Попыток' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl p-5 md:p-6 bg-cyber-card/80 border border-white/[0.06]"
            >
              <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary-200 to-cyber-blue bg-clip-text text-transparent mb-1">
                {s.v}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
