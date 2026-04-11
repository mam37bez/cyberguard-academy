import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
  as?: 'h1' | 'h2';
  /** Меньше отступ снизу — для плотных секций */
  dense?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
  className,
  as = 'h2',
  dense = false,
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={cn(dense ? 'mb-10 md:mb-12' : 'mb-14 md:mb-16', centered && 'text-center', className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-medium uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400/90" aria-hidden />
          {badge}
        </div>
      )}

      <HeadingTag className="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-white mb-3 tracking-tight text-balance">
        {title}
      </HeadingTag>

      {subtitle && (
        <p className={cn('text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
