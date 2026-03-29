'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
        <input ref={ref} id={inputId} className={cn('w-full rounded-xl bg-cyber-dark border border-cyber-border px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all', error && 'border-red-500', className)} {...props} />
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
