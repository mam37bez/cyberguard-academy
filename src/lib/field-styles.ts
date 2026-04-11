import { cn } from '@/lib/utils';

/** Подпись к полю ввода (единый стиль форм) */
export const fieldLabelClass =
  'block text-xs font-medium uppercase tracking-wide text-slate-400 mb-2';

/** Базовые классы поля: инпут, textarea, select */
export function fieldControlClass(options?: { error?: boolean; className?: string }) {
  return cn(
    'w-full rounded-xl border px-4 py-3 text-sm text-white transition-all',
    'bg-white/[0.03] border-white/[0.08] placeholder:text-slate-500',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:border-primary-500/30',
    'disabled:cursor-not-allowed disabled:opacity-45',
    options?.error && 'border-rose-500/55 focus-visible:ring-rose-500/35',
    options?.className,
  );
}
