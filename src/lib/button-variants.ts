import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses = {
  primary:
    'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-lg shadow-primary-500/25 focus-visible:ring-primary-500',
  secondary:
    'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/25 hover:border-emerald-400/40 focus-visible:ring-emerald-500/60',
  outline:
    'border border-white/[0.12] hover:border-primary-500/50 text-slate-300 hover:text-white hover:bg-primary-500/10 focus-visible:ring-primary-500',
  ghost: 'text-slate-400 hover:text-white hover:bg-white/[0.05] focus-visible:ring-primary-500/50',
} as const;

const sizeClasses = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
  xl: 'px-10 py-5 text-xl gap-3',
} as const;

export type ButtonVariant = keyof typeof variantClasses;
export type ButtonSize = keyof typeof sizeClasses;

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variantClasses[variant], sizeClasses[size], className);
}
