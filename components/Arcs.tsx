'use client';

import React, { useEffect, useState } from 'react';
import { useOnePace } from '@/context/OnePaceContext';
import {
  flattenVideosObject,
  getTime,
  getSerieTotalTime,
  getArcWatchedTime,
  getArcRemainingTime,
} from '@/helpers/time';
import { ArcInfo } from './ArcInfo';

export const Arcs = () => {
  const { state: onePace } = useOnePace();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !onePace) return null; // o <p>Loading...</p>

  const flattenVideos = flattenVideosObject(onePace);
  const totalTime = getTime(getSerieTotalTime(onePace));
  const totalWatchedTime = getArcWatchedTime(flattenVideos);
  const totalMissingTime = getArcRemainingTime(flattenVideos);

  return (
    <div className='flex w-full flex-col gap-4'>
      <div>
        <p className='text-sm text-gray-400'>2 arcs of 33 arcs processed</p>
        <p className='text-xs text-gray-400'>Total time: {totalTime}</p>
        <p className='text-xs text-gray-400'>
          Watched time: {totalWatchedTime}
        </p>
        <p className='text-xs text-gray-400'>
          Remaining time: {totalMissingTime}
        </p>
      </div>

      {Object.entries(onePace).map(([saga, arcs]) =>
        Object.entries(arcs).map(([arc, episodes], index) => {
          const isLastArc = Object.keys(arcs).length - 1 === index;
          return (
            <React.Fragment key={arc}>
              <ArcInfo sagaTitle={saga} arcTitle={arc} episodes={episodes} />
              {!isLastArc && <hr className='h-1 w-full' />}
            </React.Fragment>
          );
        }),
      )}
    </div>
  );
};
