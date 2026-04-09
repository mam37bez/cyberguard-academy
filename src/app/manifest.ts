import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CyberGuard Academy',
    short_name: 'CyberGuard',
    description: 'Обучение кибербезопасности для детей и родителей — 12 модулей, 120 квизов',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#22d3ee',
    orientation: 'portrait',
    categories: ['education', 'security'],
    lang: 'ru',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
