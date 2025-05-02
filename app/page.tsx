// page.tsx

import { Arcs } from '@/components/Arcs';
import { NavButton } from '@/components/NavButton';
import { Film } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 p-4'>
      <h1 className='text-4xl font-bold'>One Piece Tracker</h1>

      <div className='flex flex-wrap items-center justify-center gap-2 p-8'>
        <NavButton
          href='/one-pace'
          icon={<Film size={16} />}
          label='One Pace'
        />

        <NavButton
          href='/one-piece-statistics'
          icon={<Film size={16} />}
          label='Statistics'
        />
      </div>

      <Arcs />
    </div>
  );
}
