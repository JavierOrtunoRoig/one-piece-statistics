// components/EpisodeCard.tsx
'use client';

import { FC, memo } from 'react';
import { getTime } from '@/helpers/time';

interface EpisodeCardProps {
  info: Episode;
  onClick: (ep: Episode) => void;
}

const EpisodeCardComponent: FC<EpisodeCardProps> = ({ info, onClick }) => {
  return (
    <div
      onClick={() => onClick(info)}
      className={`cursor-pointer rounded-xl border p-3 shadow transition-all duration-200 hover:scale-105 ${info.watched ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/10'}`}
    >
      <h2
        className={`text-xl font-bold ${
          info.watched ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {info.title}
      </h2>
      <p className='text-xs text-gray-400'>{getTime(info.duration)}</p>
    </div>
  );
};

export const EpisodeCard = memo(EpisodeCardComponent);
