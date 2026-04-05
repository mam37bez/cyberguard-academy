import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CoursesSection } from '@/components/sections/CoursesSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { StudentBenefitsSection } from '@/components/sections/StudentBenefitsSection';
import { FamilyBenefitsSection } from '@/components/sections/FamilyBenefitsSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { TrialLessonSection } from '@/components/sections/TrialLessonSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { ShareSiteCard } from '@/components/ShareSiteCard';

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
      <StudentBenefitsSection />
      <FamilyBenefitsSection />
      <SecuritySection />
      <TestimonialsSection />
      <TrialLessonSection />
      <HowItWorksSection />
      <FAQSection />
      <ShareSiteCard />
      <CTASection />
    </>
  );
}
