import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-cyber-darker to-cyber-dark" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="text-5xl mb-6">🚀</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Готовы начать?</h2>
        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">Запишитесь на пробное занятие — это бесплатно!</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/enrollment"><Button size="xl" variant="primary">🎓 Пробное занятие</Button></Link>
          <Link href="/contact"><Button size="xl" variant="outline">📞 Задать вопрос</Button></Link>
        </div>
      </div>
    </section>
  );
}
