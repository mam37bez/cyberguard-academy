import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'gradient';
  hover?: boolean;
}

export function Card({ children, className, variant = 'default', hover = true }: CardProps) {
  const v: Record<string, string> = {
    default: 'bg-cyber-card border border-cyber-border',
    glow: 'bg-cyber-card border border-cyber-border shadow-lg shadow-primary-500/5',
    gradient: 'bg-gradient-to-br from-cyber-card to-cyber-dark border border-cyber-border',
  };
  return (
    <div className={cn('rounded-2xl p-6 transition-all duration-300', v[variant], hover && 'hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-4 pt-4 border-t border-cyber-border', className)}>{children}</div>;
}
