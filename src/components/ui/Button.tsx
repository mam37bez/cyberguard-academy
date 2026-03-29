'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-dark disabled:opacity-50 disabled:cursor-not-allowed';
    const v: Record<string, string> = {
      primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-lg shadow-primary-500/25 focus:ring-primary-500',
      secondary: 'bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green border border-cyber-green/30 hover:border-cyber-green/50 focus:ring-cyber-green',
      outline: 'border-2 border-cyber-border hover:border-primary-500 text-gray-300 hover:text-white hover:bg-primary-500/10 focus:ring-primary-500',
      ghost: 'text-gray-400 hover:text-white hover:bg-white/5 focus:ring-white/20',
    };
    const s: Record<string, string> = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
      xl: 'px-10 py-5 text-xl gap-3',
    };
    return (
      <button ref={ref} className={cn(base, v[variant], s[size], className)} disabled={disabled || isLoading} {...props}>
        {isLoading && (
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
