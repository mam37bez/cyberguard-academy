'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { modules } from '@/data/modules';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';

const slide = 56;

export default function ModuleQuizPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const quizModule = modules.find((m) => m.id === moduleId);
  const prefersReducedMotion = useReducedMotion();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (quizModule) {
      setAnsweredQuestions(new Array(quizModule.questions.length).fill(false));
    }
  }, [quizModule]);

  const dx = prefersReducedMotion ? 12 : slide;

  if (!quizModule) {
    return (
      <div className="min-h-screen bg-cyber-darker text-white flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">Модуль не найден</h1>
          <p className="text-slate-500 text-sm mb-6">Проверьте ссылку или вернитесь к списку квизов.</p>
          <ButtonLink href="/quiz" variant="primary" size="md">
            К списку квизов
          </ButtonLink>
        </motion.div>
      </div>
    );
  }

  const question = quizModule.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizModule.questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + question.points);
    }
  };

  const handleNext = () => {
    setDirection(1);
    if (currentQuestion < quizModule.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizModule.questions.length).fill(false));
    setIsCompleted(false);
  };

  if (isCompleted) {
    const maxScore = quizModule.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="min-h-screen bg-cyber-darker text-white py-16 md:py-20">
        <Container className="max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="text-6xl sm:text-7xl mb-6"
            aria-hidden
          >
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '📚'}
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            {percentage >= 80 ? 'Отлично!' : percentage >= 60 ? 'Хорошо!' : 'Попробуйте ещё раз'}
          </motion.h1>

          <motion.p
            className="text-lg text-slate-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Результат:{' '}
            <span className="text-primary-300 font-semibold tabular-nums">
              {score}
            </span>{' '}
            из {maxScore}{' '}
            <span className="text-slate-500">({percentage}%)</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              type="button"
              onClick={handleRestart}
              className="px-7 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-900/25 hover:from-primary-500 hover:to-primary-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              Пройти заново
            </motion.button>
            <ButtonLink href="/quiz" variant="outline" size="md" className="justify-center">
              Все квизы
            </ButtonLink>
          </motion.div>
        </Container>
      </div>
    );
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? dx : -dx,
      opacity: prefersReducedMotion ? 1 : 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: prefersReducedMotion ? 0 : dir < 0 ? dx : -dx,
      opacity: prefersReducedMotion ? 1 : 0,
    }),
  };

  return (
    <div className="min-h-screen bg-cyber-darker text-white py-10 md:py-14">
      <Container className="max-w-3xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/quiz"
            className="text-sm font-medium text-primary-400/90 hover:text-primary-300 mb-4 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 rounded"
          >
            ← Все квизы
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight">
            <span className="mr-2" aria-hidden>
              {quizModule.icon}
            </span>
            {quizModule.title}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{quizModule.description}</p>
        </motion.div>

        <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
          <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-2">
            <span>
              Вопрос {currentQuestion + 1} из {quizModule.questions.length}
            </span>
            <span className="tabular-nums text-slate-400">
              Очки: <span className="text-primary-300/95 font-medium">{score}</span>
            </span>
          </div>
          <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-cyber-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.45 }}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 380, damping: 32 },
              opacity: { duration: prefersReducedMotion ? 0 : 0.18 },
            }}
            className="rounded-2xl p-6 sm:p-8 bg-cyber-card border border-cyber-border mb-8 shadow-lg shadow-black/20"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 leading-snug">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  type="button"
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
                    selectedAnswer === index
                      ? showExplanation
                        ? index === question.correctAnswer
                          ? 'border-emerald-500/60 bg-emerald-500/10'
                          : 'border-rose-500/50 bg-rose-500/10'
                        : 'border-primary-500/50 bg-primary-500/10'
                      : 'border-white/[0.08] hover:border-white/15 bg-white/[0.02]'
                  } ${showExplanation && index === question.correctAnswer ? 'border-emerald-500/60 bg-emerald-500/10' : ''} disabled:opacity-90`}
                  whileHover={!showExplanation && !prefersReducedMotion ? { x: 4 } : undefined}
                  whileTap={!showExplanation && !prefersReducedMotion ? { scale: 0.99 } : undefined}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.04 }}
                >
                  <span className="font-medium text-slate-400">{String.fromCharCode(65 + index)}.</span>{' '}
                  <span className="text-slate-200">{option}</span>
                  {showExplanation && index === question.correctAnswer && (
                    <span className="text-emerald-400 ml-1">✓</span>
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                    <span className="text-rose-400 ml-1">✕</span>
                  )}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  className="mt-6 p-4 rounded-xl bg-primary-500/[0.08] border border-primary-500/20"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="text-primary-300 font-medium">Пояснение: </span>
                    {question.explanation}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Очки за вопрос: {question.points}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          {!showExplanation ? (
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-900/25 hover:from-primary-500 hover:to-primary-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
              whileHover={selectedAnswer !== null && !prefersReducedMotion ? { scale: 1.02 } : undefined}
              whileTap={selectedAnswer !== null && !prefersReducedMotion ? { scale: 0.98 } : undefined}
            >
              Ответить
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-900/25 hover:from-primary-500 hover:to-primary-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
              whileHover={!prefersReducedMotion ? { scale: 1.02 } : undefined}
              whileTap={!prefersReducedMotion ? { scale: 0.98 } : undefined}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentQuestion < quizModule.questions.length - 1 ? 'Следующий вопрос →' : 'Завершить тест'}
            </motion.button>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
