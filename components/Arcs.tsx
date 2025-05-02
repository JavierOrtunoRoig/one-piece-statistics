'use client';

import { Clock, Eye, Film, Hourglass, ListChecks } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  flattenVideosObject,
  getTime,
  getSerieTotalTime,
  getArcWatchedTime,
  getArcRemainingTime,
} from '@/helpers/time';
import { ArcInfo } from './ArcInfo';
import { ProgressBar } from './ProgressBar';
import { StatCard } from './StatCard';
import { useSerieProgress } from '@/context/SerieContext';

type ArcEntry = {
  saga: string;
  arc: string;
  episodes: Episode[];
  isCompleted: boolean;
};

export const Arcs = () => {
  const { state: onePace } = useSerieProgress();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !onePace) return null;

  const flattenVideos = flattenVideosObject(onePace);
  const totalTime = getTime(getSerieTotalTime(onePace));
  const totalWatchedTime = getArcWatchedTime(flattenVideos);
  const totalMissingTime = getArcRemainingTime(flattenVideos);

  const arcsWatched = Object.values(flattenVideos).filter(
    (ep) => ep.watched,
  ).length;
  const totalEpisodes = flattenVideos.length;
  const percentWatched =
    totalEpisodes > 0 ? (arcsWatched / totalEpisodes) * 100 : 0;

  // Convert and flatten to sortable list of arcs
  const arcEntries: ArcEntry[] = [];

  for (const [saga, arcs] of Object.entries(onePace)) {
    for (const [arc, episodes] of Object.entries(arcs)) {
      const isCompleted = episodes.every((ep) => ep.watched);
      arcEntries.push({ saga, arc, episodes, isCompleted });
    }
  }

  // Incomplete arcs first
  const sortedArcs = arcEntries.sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1; // completed go last
  });

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='rounded-xl border border-neutral-800 bg-neutral-900 p-5 shadow-md'>
        <h2 className='mb-3 flex items-center gap-2 text-lg font-bold text-white'>
          <ListChecks size={18} /> General Progress
        </h2>

        <div className='flex flex-wrap gap-6 text-sm text-neutral-300'>
          <StatCard
            label='Total'
            value={totalTime}
            icon={<Clock size={16} />}
          />
          <StatCard
            label='Watched'
            value={totalWatchedTime}
            icon={<Eye size={16} />}
            className='text-green-400'
          />
          <StatCard
            label='Remaining'
            value={totalMissingTime}
            icon={<Hourglass size={16} />}
            className='text-yellow-400'
          />
          <StatCard
            label='Episodes watched'
            value={`${arcsWatched} / ${totalEpisodes} - ${percentWatched.toFixed(2)}%`}
            icon={<Film size={16} />}
          />
        </div>

        <ProgressBar value={percentWatched} />
      </div>

      {sortedArcs.map(({ saga, arc, episodes }, index) => {
        const isLastArc = index === sortedArcs.length - 1;
        return (
          <React.Fragment key={`${saga}-${arc}`}>
            <ArcInfo sagaTitle={saga} arcTitle={arc} episodes={episodes} />
            {!isLastArc && <hr className='h-1 w-full' />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
