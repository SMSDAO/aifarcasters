'use client';
import React from 'react';

interface NavbarProps {
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function Navbar({ logo, actions, className }: NavbarProps) {
  return (
    <header className={`flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-3 backdrop-blur-sm ${className ?? ''}`}>
      <div className="flex items-center gap-3">{logo}</div>
      <div className="flex items-center gap-3">{actions}</div>
    </header>
  );
}
