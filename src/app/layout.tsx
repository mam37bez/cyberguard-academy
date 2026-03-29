import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cyberguard-academy.vercel.app'),
  title: {
    default: 'CyberGuard Academy',
    template: '%s | CyberGuard Academy',
  },
  description: 'CyberGuard Academy — школа кибербезопасности для детей и взрослых: курсы, блог, обучение и практические инструменты по информационной безопасности.',
  keywords: [
    'кибербезопасность',
    'информационная безопасность',
    'курсы по кибербезопасности',
    'обучение кибербезопасности',
    'cybersecurity academy',
    'ethical hacking',
    'security training',
    'cyberguard academy'
  ],
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '7OXKptXRHyST3rxYOYBpeSf4KxSu94uswVnYSfbFFr8',
    other: {
      'msvalidate.01': '78FE0C8D5949E66515F924B35DF18BAA',
    },
  },
  openGraph: {
    title: 'CyberGuard Academy',
    description: 'Школа кибербезопасности для детей и взрослых: курсы, блог и практические инструменты по информационной безопасности.',
    url: 'https://cyberguard-academy.vercel.app',
    siteName: 'CyberGuard Academy',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberGuard Academy',
    description: 'Школа кибербезопасности для детей и взрослых: курсы, блог и практические инструменты по информационной безопасности.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'CyberGuard Academy',
    url: 'https://cyberguard-academy.vercel.app',
    description: 'Школа кибербезопасности для детей и взрослых.',
  };

  return (
    <html lang="ru" className="dark">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
