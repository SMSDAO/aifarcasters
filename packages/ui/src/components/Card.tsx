import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-8' };

export function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <div className={twMerge(clsx('rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm', paddingMap[padding], className))}>
      {children}
    </div>
  );
}
