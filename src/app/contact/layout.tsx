import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с CyberGuard Academy: задайте вопрос, получите консультацию по обучению и узнайте больше о курсах по кибербезопасности.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
