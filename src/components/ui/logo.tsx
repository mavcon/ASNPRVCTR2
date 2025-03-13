import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <Link href="/">
      <div className={cn('logo font-bold', sizeClasses[size], className)}>
        <span className="logo-chinese">亞</span>{' '}
        <span className="logo-text">ASNPRVCTR</span>
      </div>
    </Link>
  );
} 