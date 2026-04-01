import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CoursesSection } from '@/components/sections/CoursesSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Главная',
  description:
    'CyberGuard Academy — обучение кибербезопасности для детей и взрослых: курсы, блог, инструменты и практические материалы по информационной безопасности.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <WhyUsSection />
      <SecuritySection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
