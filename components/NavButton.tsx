'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { cn } from '@/helpers/cn';

interface NavButtonProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
}

export const NavButton: FC<NavButtonProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-inner shadow-violet-900 transition-all duration-300',
        isActive
          ? 'bg-gradient-to-r from-violet-700 to-fuchsia-600 text-white'
          : 'bg-gradient-to-r from-violet-800 to-purple-700 text-white hover:scale-[1.04] hover:from-fuchsia-600 hover:to-violet-700',
      )}
    >
      {icon}
      {label}
    </Link>
  );
};
