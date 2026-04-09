'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { modules } from '@/data/modules';
import { useState, useEffect } from 'react';

export default function ModuleQuizPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const quizModule = modules.find((m) => m.id === moduleId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (quizModule) {
      setAnsweredQuestions(new Array(quizModule.questions.length).fill(false));
    }
  }, [quizModule]);

  if (!quizModule) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">❌ Модуль не найден</h1>
          <Link
            href="/quiz"
            className="text-cyan-400 hover:underline"
          >
            ← Вернуться к квизам
          </Link>
        </div>
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="text-8xl mb-8">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '📚'}
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {percentage >= 80 ? 'Отлично!' : percentage >= 60 ? 'Хорошо!' : 'Попробуй ещё раз!'}
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Твой результат: <span className="text-cyan-400 font-bold">{score}</span> из {maxScore} ({percentage}%)
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold transition-colors"
            >
              🔄 Пройти заново
            </button>
            <Link
              href="/quiz"
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold transition-colors"
            >
              ← Все квизы
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/quiz" className="text-cyan-400 hover:underline mb-4 inline-block">
            ← Все квизы
          </Link>
          <h1 className="text-3xl font-bold mb-2">
            {quizModule.icon} {quizModule.title}
          </h1>
          <p className="text-gray-400">{quizModule.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Вопрос {currentQuestion + 1} из {quizModule.questions.length}</span>
            <span>Очки: {score}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-red-500 bg-red-500/20'
                      : 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                } ${showExplanation && index === question.correctAnswer ? 'border-green-500 bg-green-500/20' : ''}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                {showExplanation && index === question.correctAnswer && ' ✅'}
                {showExplanation && selectedAnswer === index && index !== question.correctAnswer && ' ❌'}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-sm text-gray-300">
                <strong className="text-blue-400">💡 Объяснение:</strong> {question.explanation}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <strong>Очки за вопрос:</strong> {question.points}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-bold transition-colors"
            >
              Ответить
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold transition-colors"
            >
              {currentQuestion < quizModule.questions.length - 1 ? 'Следующий вопрос →' : 'Завершить тест'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
