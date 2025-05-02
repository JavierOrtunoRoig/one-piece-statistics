'use client';

import { FC, useState } from 'react';
import {
  getArcRemainingTime,
  getArcTime,
  getArcWatchedTime,
} from '../helpers/time';
import { useOnePace } from '@/context/OnePaceContext';
import { EpisodeCard } from './EpisodeCard';
import { Clock, Eye, Hourglass, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { StatCard } from './StatCard';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

interface Props {
  sagaTitle: string;
  arcTitle: string;
  episodes: Episode[];
}

export const ArcInfo: FC<Props> = ({ sagaTitle, arcTitle, episodes }) => {
  const { dispatch } = useOnePace();

  const remainingTime = getArcRemainingTime(episodes);
  const isCompleted = remainingTime === '0 minutes and 0 seconds';

  const [isOpen, setIsOpen] = useState(!isCompleted);
  const [ref, { height }] = useMeasure();

  const allWatched = episodes.every((ep) => ep.watched);

  const toggleAllEpisodes = () => {
    episodes.forEach((ep) => {
      const shouldBeWatched = !allWatched;
      if (ep.watched !== shouldBeWatched) {
        dispatch({
          type: 'TOGGLE_EPISODE',
          payload: {
            saga: sagaTitle,
            arc: arcTitle,
            title: ep.title,
          },
        });
      }
    });
  };

  const handleToggle = (info: Episode) => {
    dispatch({
      type: 'TOGGLE_EPISODE',
      payload: { saga: sagaTitle, arc: arcTitle, title: info.title },
    });
  };

  return (
    <div
      className={clsx(
        'rounded-xl border shadow-md transition hover:shadow-lg',
        {
          'border-green-900 bg-green-900/20': isCompleted,
          'border-neutral-800 bg-neutral-900': !isCompleted,
        },
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full cursor-pointer items-center justify-between p-4 text-left'
      >
        <h3 className='text-xl font-semibold text-white'>{arcTitle}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className='text-neutral-400'
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <motion.div
        animate={{ height: isOpen ? height : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className='overflow-hidden'
      >
        <div ref={ref} className='px-4 pb-4'>
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
              value={remainingTime}
              icon={<Hourglass size={16} />}
              className='text-yellow-400'
            />
          </div>

          <div className='mb-4'>
            <button
              onClick={toggleAllEpisodes}
              className='rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-neutral-700'
            >
              {!allWatched
                ? 'Marcar todos como vistos'
                : 'Marcar todos como no vistos'}
            </button>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {episodes.map((ep) => (
              <EpisodeCard key={ep.title} info={ep} onClick={handleToggle} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
