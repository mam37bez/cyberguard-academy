import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Записаться',
  description: 'Оставьте заявку на обучение в CyberGuard Academy и запишитесь на курс по кибербезопасности для детей, подростков или родителей.',
  alternates: {
    canonical: `${SITE_URL}/enrollment`,
  },
};

export default function EnrollmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
