import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
  className,
  as = 'h2',
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={cn('mb-16', centered && 'text-center', className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
          {badge}
        </div>
      )}

      <HeadingTag className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
        {title}
      </HeadingTag>

      {subtitle && (
        <p className={cn('text-lg text-gray-400 max-w-3xl', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
