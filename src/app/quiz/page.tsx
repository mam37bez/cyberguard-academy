'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { modules } from '@/data/modules';
import { motion } from 'framer-motion';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🎯 Интерактивные Квизы
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Проверь свои знания в кибербезопасности! Выбери модуль и пройди тест.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/quiz/${module.id}`}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 block h-full"
              >
                {/* Icon */}
                <motion.div 
                  className="text-6xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {module.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {module.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm flex-wrap">
                  {/* Difficulty Badge */}
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      module.difficulty === 'beginner'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : module.difficulty === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {module.difficulty === 'beginner' && '🟢 Начальный'}
                    {module.difficulty === 'intermediate' && '🟡 Средний'}
                    {module.difficulty === 'advanced' && '🔴 Продвинутый'}
                  </span>

                  {/* Time */}
                  <span className="text-gray-500">⏱️ {module.estimatedTime}</span>
                </div>

                {/* Questions Count */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">
                    📝 {module.questions.length} вопросов
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 text-gray-600 group-hover:text-cyan-400 transition-colors">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {modules.length}
            </div>
            <div className="text-gray-400">Модулей</div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {modules.reduce((sum, m) => sum + m.questions.length, 0)}
            </div>
            <div className="text-gray-400">Вопросов</div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">
              {Math.round(
                modules.reduce((sum, m) => {
                  const time = parseInt(m.estimatedTime);
                  return sum + (isNaN(time) ? 20 : time);
                }, 0) / 60
              )}ч
            </div>
            <div className="text-gray-400">Обучения</div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2">∞</div>
            <div className="text-gray-400">Попыток</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
