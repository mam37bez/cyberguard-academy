import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/StructuredData';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { YandexMetrica } from '@/components/YandexMetrica';
import { Chatbot } from '@/components/Chatbot';
import { SITE_URL } from '@/lib/site';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap', variable: '--font-inter' });

export const viewport: Viewport = {
  themeColor: '#22d3ee',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CyberGuard Academy — обучение кибербезопасности для детей и родителей',
    template: '%s | CyberGuard Academy',
  },
  description:
    'CyberGuard Academy — онлайн-академия по кибербезопасности. 12 модулей, 120 интерактивных квизов. Обучение детей, подростков и родителей основам безопасности в интернете.',
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
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
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
  twitter: {
    card: 'summary_large_image',
    title: 'CyberGuard Academy — обучение кибербезопасности',
    description:
      '12 модулей и 120 интерактивных квизов по кибербезопасности для детей и родителей.',
    images: ['/opengraph-image'],
    creator: '@cyberguard_academy',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'ru-RU': SITE_URL,
      ru: SITE_URL,
    },
  },
  verification: {
    google: '7OXKptXRHyST3rxYOYBpeSf4KxSu94uswVnYSfbFFr8',
    yandex: 'fe718da3690b38c2',
  },
  category: 'education',
  applicationName: 'CyberGuard Academy',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CyberGuard Academy',
  },
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
  const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || '').trim();
  const ymRaw = process.env.NEXT_PUBLIC_YM_ID || '';
  const YM_ID = ymRaw.replace(/^id\s*=\s*/i, '').trim();

  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-xl focus:bg-primary-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-cyber-darker"
        >
          Перейти к содержимому
        </a>
        <StructuredData />
        {GA_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_ID} />}
        {YM_ID && <YandexMetrica YM_ID={YM_ID} />}
        <Header />
        <main id="main-content" className="min-h-[45vh]" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
