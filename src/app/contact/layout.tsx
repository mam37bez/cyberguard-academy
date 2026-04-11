import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с CyberGuard Academy: задайте вопрос, получите консультацию по обучению и узнайте больше о курсах по кибербезопасности.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
