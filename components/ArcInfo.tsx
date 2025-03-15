import type { FC } from 'react';
import {
  getArcRemainingTime,
  getArcTime,
  getArcWatchedTime,
  getTime,
} from '../helpers/time';

interface props {
  sagaTitle: string;
  arcTitle: string;
  episodes: Episode[];
  setOnePace: React.Dispatch<React.SetStateAction<Serie | null>>;
}

export const ArcInfo: FC<props> = ({
  sagaTitle,
  arcTitle,
  episodes,
  setOnePace,
}) => {
  const changeWatched = (info: Episode) => {
    const onePace = JSON.parse(
      localStorage.getItem('one_pace') as string,
    ) as Serie;
    const episode = onePace[sagaTitle][arcTitle].find(
      ({ title }) => title === info.title,
    );
    if (!episode) throw new Error('Episode not found');
    episode.watched = !episode?.watched;

    localStorage.setItem('one_pace', JSON.stringify(onePace));
    setOnePace(onePace);
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
            Reamining time: {getArcRemainingTime(episodes)}
          </p>
        </div>

        <div className='flex flex-wrap gap-4'>
          {episodes.map((info) => (
            <div
              key={info.title}
              className='flex cursor-pointer flex-col'
              onClick={() => changeWatched(info)}
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
