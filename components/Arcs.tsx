'use client';

import React, { useState, useEffect } from 'react';
import { ArcInfo } from './ArcInfo';
import { mergeJsons } from '@/helpers/json';
import latestJson from '@/assets/one_pace.json';
import { flattenVideosObject, getTime } from '../helpers/time';
import {
  getArcRemainingTime,
  getArcWatchedTime,
  getSerieTotalTime,
} from '@/helpers/time';

const lastOnePace = latestJson as Serie;

export const Arcs = () => {
  const [onePace, setOnePace] = useState<Serie | null>(null);

  useEffect(() => {
    const getFinaljson = () => {
      let merge = lastOnePace;
      if (typeof window !== 'undefined' && localStorage.getItem('one_pace')) {
        const existingInfo = JSON.parse(
          localStorage.getItem('one_pace') as string,
        );
        merge = mergeJsons(lastOnePace, existingInfo);
      }
      localStorage.setItem('one_pace', JSON.stringify(merge));
      return merge;
    };

    setOnePace(getFinaljson());
  }, []);

  if (!onePace) return <p>Loading...</p>;

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
              <ArcInfo
                sagaTitle={saga}
                arcTitle={arc}
                episodes={episodes}
                setOnePace={setOnePace}
              />
              {!isLastArc && <hr className='h-1 w-full' />}
            </React.Fragment>
          );
        }),
      )}
    </div>
  );
};
