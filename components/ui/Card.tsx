'use client';

import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export const Card = ({ padded = true, className, children, ...props }: CardProps) => {
  return (
    <div
      {...props}
      className={[
        'relative overflow-hidden rounded-3xl bg-dark-900 border border-white/10 backdrop-blur-sm',
        'transition-all duration-500 hover:border-brand-500/40 hover:shadow-[0_0_40px_rgba(14,165,233,0.1)]',
        padded ? 'p-6' : '',
        className,
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
};
