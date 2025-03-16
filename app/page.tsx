import { Arcs } from '@/components/Arcs';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-8 p-4'>
      <h1 className='text-4xl font-bold'>One Pace</h1>

      <p className='text-sm text-gray-400'>
        A one piece episode has a duration of 22~24. I round to 23 minutes to do
        next stadistics
      </p>

      <a
        href='/one-piece'
        className='rounded-lg bg-violet-700 p-2 transition-all duration-300 hover:scale-110 hover:bg-violet-900'
      >
        One Piece Statistics
      </a>
      <Arcs />
    </div>
  );
}
