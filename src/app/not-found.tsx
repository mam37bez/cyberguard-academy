import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-28 pb-20">
      <Container className="text-center max-w-lg">
        <p className="text-6xl sm:text-7xl mb-4" aria-hidden>
          🔍
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">404</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Страница не найдена. Проверьте адрес или вернитесь на главную.
        </p>
        <ButtonLink href="/" variant="primary" size="lg">
          На главную
        </ButtonLink>
        <p className="mt-8 text-sm text-slate-600">
          Нужна помощь?{' '}
          <Link href="/contact" className="text-primary-400/90 hover:text-primary-300 underline-offset-2 hover:underline rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50">
            Контакты
          </Link>
        </p>
      </Container>
    </div>
  );
}
