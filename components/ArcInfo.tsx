'use client';

import { FC } from 'react';
import {
  getArcRemainingTime,
  getArcTime,
  getArcWatchedTime,
  getTime,
} from '../helpers/time';
import { useOnePace } from '@/context/OnePaceContext';

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

        <div className='flex flex-wrap gap-4'>
          {episodes.map((info) => (
            <div
              key={info.title}
              className='flex cursor-pointer flex-col'
              onClick={() => handleToggle(info)}
            >
              <h2
                className={`${info.watched ? 'text-green-400' : 'text-red-400'} text-xl font-bold transition-all duration-300`}
              >
                {info.title}
              </h2>
              <p className='text-xs text-gray-400'>{getTime(info.duration)}</p>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
};
