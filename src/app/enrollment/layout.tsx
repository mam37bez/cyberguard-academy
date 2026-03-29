import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Записаться',
  description: 'Оставьте заявку на обучение в CyberGuard Academy и запишитесь на курс по кибербезопасности для детей, подростков или родителей.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/enrollment',
  },
};

export default function EnrollmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
