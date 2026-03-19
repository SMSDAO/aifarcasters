'use client';
import React from 'react';
import { clsx } from 'clsx';

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  return (
    <nav className={clsx('flex flex-col gap-1 p-4', className)}>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={clsx(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            item.active
              ? 'bg-purple-600/20 text-purple-400'
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white',
          )}
        >
          {item.icon && <span className="shrink-0">{item.icon}</span>}
          {item.label}
        </a>
      ))}
    </nav>
  );
}
