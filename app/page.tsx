import { ArcsWrapper } from '@/components/ArcsWrapper';
import { NavButton } from '@/components/NavButton';
import { FastForward, Film, Shuffle } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 p-4'>
      <h1 className='text-4xl font-bold'>One Pace</h1>

      <p className='max-w-prose text-center text-sm text-gray-400'>
        A One Piece episode usually lasts around 22-24 minutes. For statistics
        purposes, I round them to 23 minutes per episode.
      </p>

      <div className='flex flex-wrap items-center justify-center gap-2 p-8'>
        <NavButton
          href='/one-piece'
          icon={<Film size={16} />}
          label='One Piece Statistics'
        />

        <NavButton
          href='/one-pace'
          icon={<FastForward size={16} />}
          label='One Pace Statistics'
        />

        <NavButton
          href='/comparation'
          icon={<Shuffle size={16} />}
          label='Comparation Statistics'
        />
      </div>

      <ArcsWrapper />
    </div>
  );
}
