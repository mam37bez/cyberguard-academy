import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">Страница не найдена</p>
        <Link href="/" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl">На главную</Link>
      </div>
    </div>
  );
}
