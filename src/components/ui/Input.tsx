'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { fieldControlClass, fieldLabelClass } from '@/lib/field-styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className={fieldLabelClass}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={fieldControlClass({ error: !!error, className })}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-rose-400">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
