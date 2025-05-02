// one-pace/page.tsx
import { Arcs } from '@/components/Arcs';
import { NavButton } from '@/components/NavButton';
import { ExternalLink, Film } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 p-4'>
      <header className='flex w-full justify-between'>
        <div className='w-[160px]'></div>
        <Link
          href='https://onepace.net/en'
          target='_blank'
          className='flex items-end gap-2'
        >
          <h1 className='text-4xl font-bold'>One Pace Tracker</h1>
        </Link>

        <Link
          href='https://onepace.net/en'
          target='_blank'
          className='flex w-[160px] items-end gap-1 rounded-xl bg-gradient-to-r from-red-800 to-rose-700 px-4 py-2 text-sm font-bold text-white shadow-inner shadow-red-900 transition-all duration-300 hover:scale-[1.04] hover:from-rose-600 hover:to-red-700'
        >
          <h2 className='text-1xl'>Watch One Pace</h2>
          <div className='mb-0.5'>
            <ExternalLink size={16} />
          </div>
        </Link>
      </header>

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
