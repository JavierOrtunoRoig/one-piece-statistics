'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  color?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  color = '#22c55e',
}) => {
  return (
    <div className='mt-4 h-3 w-full overflow-hidden rounded-full bg-neutral-800'>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: `${value}%`, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='h-full'
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
