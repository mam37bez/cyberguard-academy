import type { Metadata } from 'next';
import { modules } from '@/data/modules';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return modules.map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) {
    return { title: 'Модуль не найден', robots: { index: false, follow: true } };
  }

  const url = `${SITE_URL}/quiz/${mod.id}`;
  const difficultyRu =
    mod.difficulty === 'beginner' ? 'начальный' : mod.difficulty === 'intermediate' ? 'средний' : 'продвинутый';
  const description = `${mod.description} Интерактивный квиз: ${mod.questions.length} вопросов с пояснениями. Уровень: ${difficultyRu}.`;

  return {
    title: `${mod.title} — квиз`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${mod.title} | CyberGuard Academy`,
      description,
      url,
      type: 'website',
      locale: 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${mod.title} — квиз`,
      description,
    },
  };
}

export default function QuizModuleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
