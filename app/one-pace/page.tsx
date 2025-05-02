// one-pace/page.tsx
import { Arcs } from '@/components/Arcs';
import { NavButton } from '@/components/NavButton';
import { Film } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 p-4'>
      <h1 className='text-4xl font-bold'>One Pace</h1>

      <p className='max-w-prose text-center text-sm text-gray-400'>
        A One Piece episode usually lasts around 22-24 minutes. For statistics
        purposes, I round them to 23 minutes per episode.
      </p>

      <div className='flex flex-wrap items-center justify-center gap-2 p-8'>
        <NavButton href='/' icon={<Film size={16} />} label='One Piece' />

        <NavButton
          href='/one-pace-statistics'
          icon={<Film size={16} />}
          label='Statistics'
        />
      </div>

      <Arcs />
    </div>
  );
}
