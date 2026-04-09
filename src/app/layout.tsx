import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/StructuredData';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cyberguard-academy.vercel.app'),
  title: {
    default: 'CyberGuard Academy — обучение кибербезопасности для детей и родителей',
    template: '%s | CyberGuard Academy',
  },
  description:
    'CyberGuard Academy — онлайн-академия по кибербезопасности. 12 модулей, 120 интерактивных квизов. Обучение детей, подростков и родителей основам безопасности в интернете: защита от мошенников, приватность, OSINT, криптография.',
  keywords: [
    'кибербезопасность',
    'обучение детей',
    'безопасность в интернете',
    'квизы по безопасности',
    'защита данных',
    'киберакадемия',
    'онлайн обучение',
    'информационная безопасность',
    'OSINT',
    'криптография',
    'фишинг',
    'мошенничество',
    'приватность',
    'VPN',
    'IoT безопасность',
    'social engineering',
  ],
  authors: [{ name: 'CyberGuard Academy' }],
  creator: 'CyberGuard Academy',
  publisher: 'CyberGuard Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, VK, Telegram)
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://cyberguard-academy.vercel.app',
    siteName: 'CyberGuard Academy',
    title: 'CyberGuard Academy — обучение кибербезопасности для детей и родителей',
    description:
      '12 модулей и 120 интерактивных квизов по кибербезопасности. Научись защищаться от мошенников, сохранять приватность и безопасно пользоваться интернетом.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'CyberGuard Academy — обучение кибербезопасности',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'CyberGuard Academy — обучение кибербезопасности',
    description:
      '12 модулей и 120 интерактивных квизов по кибербезопасности для детей и родителей.',
    images: ['/opengraph-image'],
    creator: '@cyberguard_academy',
  },

  // Verification
  verification: {
    google: 'ваш_google_код', // Замени после получения от Google
    // yandex: 'ваш_yandex_код', // Если добавишь Яндекс.Вебмастер
    // other: {
    //   'msvalidate.01': 'ваш_bing_код', // Если добавишь Bing
    // },
  },

  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app',
  },

  // Other metadata
  category: 'education',
  applicationName: 'CyberGuard Academy',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
