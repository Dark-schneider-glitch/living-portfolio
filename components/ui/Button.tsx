'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants: Record<string, string> = {
  primary: 'bg-brand-500 hover:bg-brand-400 text-dark-950 shadow-[0_0_20px_rgba(183,227,94,0.22)]',
  ghost: 'bg-white/5 hover:bg-white/10 text-white',
  outline: 'border border-white/20 hover:border-brand-500 text-white',
};

const sizes: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      ].join(' ').trim()}
      {...props}
    />
  );
});

Button.displayName = 'Button';
