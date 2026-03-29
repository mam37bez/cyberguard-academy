import { HeroSection } from '@/components/sections/HeroSection';
import { CoursesSection } from '@/components/sections/CoursesSection';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <SecuritySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
