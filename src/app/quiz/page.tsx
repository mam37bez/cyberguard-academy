import type { Metadata } from 'next';
import { QuizPageClient } from './QuizPageClient';
import { modules } from '@/data/modules';
import { SITE_URL } from '@/lib/site';

const totalQuestions = modules.reduce((sum, m) => sum + m.questions.length, 0);

export const metadata: Metadata = {
  title: 'Интерактивные квизы по кибербезопасности',
  description: `Бесплатные квизы по кибербезопасности: ${modules.length} модулей, ${totalQuestions}+ вопросов по сетям, фишингу, криптографии, OSINT и защите данных. Для школьников и взрослых.`,
  keywords: [
    'квиз кибербезопасность',
    'тест по информационной безопасности',
    'обучение ИБ онлайн',
    'фишинг квиз',
    'киберграмотность',
  ],
  alternates: {
    canonical: `${SITE_URL}/quiz`,
  },
  openGraph: {
    title: 'Квизы по кибербезопасности — CyberGuard Academy',
    description: `Проверьте знания: ${modules.length} тематических модулей и сотни вопросов с пояснениями.`,
    url: `${SITE_URL}/quiz`,
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Квизы по кибербезопасности — CyberGuard Academy',
    description: `Интерактивные тесты: сети, веб, криптография, социальная инженерия и др.`,
  },
};

export default function QuizPage() {
  return <QuizPageClient />;
}
