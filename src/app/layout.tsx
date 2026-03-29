import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'CyberGuard Academy', template: '%s | CyberGuard Academy' },
  description: 'Школа кибербезопасности для детей и взрослых.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
