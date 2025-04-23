'use client';

import { FC } from 'react';
import {
  getArcRemainingTime,
  getArcTime,
  getArcWatchedTime,
} from '../helpers/time';
import { useOnePace } from '@/context/OnePaceContext';
import { EpisodeCard } from './EpisodeCard';

interface props {
  sagaTitle: string;
  arcTitle: string;
  episodes: Episode[];
}

export const ArcInfo: FC<props> = ({ sagaTitle, arcTitle, episodes }) => {
  const { dispatch } = useOnePace();

  const handleToggle = (info: Episode) => {
    dispatch({
      type: 'TOGGLE_EPISODE',
      payload: { saga: sagaTitle, arc: arcTitle, title: info.title },
    });
  };

  return (
    <details className='w-full p-2' open>
      <summary className='text-lg'>{arcTitle}</summary>
      <div className='flex flex-col gap-4 p-2'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-400'>
            Total time: {getArcTime(episodes)}
          </p>
          <p className='text-xs text-gray-400'>
            Watched time: {getArcWatchedTime(episodes)}
          </p>
          <p className='text-xs text-gray-400'>
            Remaining time: {getArcRemainingTime(episodes)}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {episodes.map((ep) => (
            <EpisodeCard key={ep.title} info={ep} onClick={handleToggle} />
          ))}
        </div>
      </div>
    </details>
  );
};
