'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { fieldControlClass, fieldLabelClass } from '@/lib/field-styles';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const tid = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={tid} className={fieldLabelClass}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={tid}
          className={cn(fieldControlClass({ error: !!error }), 'resize-y min-h-[120px]', className)}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-rose-400">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
