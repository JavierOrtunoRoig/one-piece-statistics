'use client';

import { FC, memo } from 'react';
import { getTime } from '@/helpers/time';

interface EpisodeCardProps {
  info: Episode;
  onClick: (ep: Episode) => void;
}

const EpisodeCardComponent: FC<EpisodeCardProps> = ({ info, onClick }) => {
  return (
    <div className='flex cursor-pointer flex-col' onClick={() => onClick(info)}>
      <h2
        className={`${
          info.watched ? 'text-green-400' : 'text-red-400'
        } text-xl font-bold transition-all duration-300`}
      >
        {info.title}
      </h2>
      <p className='text-xs text-gray-400'>{getTime(info.duration)}</p>
    </div>
  );
};

export const EpisodeCard = memo(EpisodeCardComponent);
