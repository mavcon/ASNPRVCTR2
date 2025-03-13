import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { MainNav, NavActions } from '@/components/layout/navigation';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="hidden md:block">
            <NavActions />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
} 