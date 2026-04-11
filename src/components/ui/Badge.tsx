import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const v: Record<string, string> = {
    default: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    outline: 'bg-transparent text-slate-400 border-white/[0.12]',
  };
  const s: Record<string, string> = { sm: 'px-2.5 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };
  return <span className={cn('inline-flex items-center font-medium rounded-full border', v[variant], s[size], className)}>{children}</span>;
}
