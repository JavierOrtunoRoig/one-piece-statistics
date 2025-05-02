// components/StatCard.tsx
'use client';

import { FC, ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  icon,
  className,
}) => {
  return (
    <div className={`flex items-start gap-3 text-sm ${className}`}>
      {icon && <div className='mt-1 text-lg'>{icon}</div>}
      <div className='flex flex-col'>
        <span className='text-xs text-neutral-400'>{label}</span>
        <span className='font-semibold text-white'>{value}</span>
      </div>
    </div>
  );
};
