'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const tid = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="w-full">
        {label && <label htmlFor={tid} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
        <textarea ref={ref} id={tid} className={cn('w-full rounded-xl bg-cyber-dark border border-cyber-border px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-y min-h-[120px]', error && 'border-red-500', className)} {...props} />
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
