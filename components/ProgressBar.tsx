// components/ProgressBar.tsx
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
}

const interpolateColor = (start: string, end: string, t: number): string => {
  const hexToRgb = (hex: string) => {
    const n = hex.replace('#', '');
    return [
      parseInt(n.substring(0, 2), 16),
      parseInt(n.substring(2, 4), 16),
      parseInt(n.substring(4, 6), 16),
    ];
  };

  const rgbToHex = (r: number, g: number, b: number) =>
    `#${[r, g, b]
      .map((x) => Math.round(x).toString(16).padStart(2, '0'))
      .join('')}`;

  const [r1, g1, b1] = hexToRgb(start);
  const [r2, g2, b2] = hexToRgb(end);

  const r = r1 + (r2 - r1) * t;
  const g = g1 + (g2 - g1) * t;
  const b = b1 + (b2 - b1) * t;

  return rgbToHex(r, g, b);
};

const getProgressColor = (value: number): string => {
  if (value <= 50) {
    const percent = value / 50;
    return interpolateColor('#ef4444', '#facc15', percent);
  } else {
    const percent = (value - 50) / 50;
    return interpolateColor('#facc15', '#22c55e', percent);
  }
};

export const ProgressBar: FC<ProgressBarProps> = ({ value }) => {
  const dynamicColor = getProgressColor(value);

  return (
    <div className='mt-4 h-3 w-full overflow-hidden rounded-full bg-neutral-800'>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: `${value}%`, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='h-full'
        style={{ backgroundColor: dynamicColor }}
      />
    </div>
  );
};
