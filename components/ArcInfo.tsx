'use client';

import { FC } from 'react';
import {
  getArcRemainingTime,
  getArcTime,
  getArcWatchedTime,
} from '../helpers/time';
import { useOnePace } from '@/context/OnePaceContext';
import { EpisodeCard } from './EpisodeCard';
import { Clock, Eye, Hourglass } from 'lucide-react';
import clsx from 'clsx'; // Requiere instalación con: npm i clsx
import { StatCard } from './StatCard';

interface Props {
  sagaTitle: string;
  arcTitle: string;
  episodes: Episode[];
}

export const ArcInfo: FC<Props> = ({ sagaTitle, arcTitle, episodes }) => {
  const { dispatch } = useOnePace();

  const remainingTime = getArcRemainingTime(episodes);
  const isCompleted = remainingTime === '0 minutes and 0 seconds';

  const handleToggle = (info: Episode) => {
    dispatch({
      type: 'TOGGLE_EPISODE',
      payload: { saga: sagaTitle, arc: arcTitle, title: info.title },
    });
  };

  return (
    <div
      className={clsx(
        'rounded-xl border p-4 shadow-md transition hover:shadow-lg',
        {
          'border-green-900 bg-green-900/20': isCompleted,
          'border-neutral-800 bg-neutral-900': !isCompleted,
        },
      )}
    >
      <h3 className='mb-4 text-xl font-semibold text-white'>{arcTitle}</h3>

      <div className='mb-4 flex flex-wrap gap-6 text-sm text-neutral-300'>
        <StatCard
          label='Total'
          value={getArcTime(episodes) as string}
          icon={<Clock size={16} />}
        />
        <StatCard
          label='Visto'
          value={getArcWatchedTime(episodes)}
          icon={<Eye size={16} />}
          className='text-green-400'
        />
        <StatCard
          label='Restante'
          value={getArcRemainingTime(episodes)}
          icon={<Hourglass size={16} />}
          className='text-yellow-400'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {episodes.map((ep) => (
          <EpisodeCard key={ep.title} info={ep} onClick={handleToggle} />
        ))}
      </div>
    </div>
  );
};
