import PieChart from '@/components/PieChart';
import React from 'react';
import onePace from '@/assets/one_pace.json';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <div className='flex items-center justify-center gap-2 p-8'>
        <Link
          href='/'
          className='rounded-lg bg-violet-700 p-2 transition-all duration-300 hover:scale-110 hover:bg-violet-900'
        >
          Home
        </Link>

        <Link
          href='/one-piece'
          className='rounded-lg bg-violet-700 p-2 transition-all duration-300 hover:scale-110 hover:bg-violet-900'
        >
          One Piece Statistics
        </Link>
      </div>
      <div className='flex w-full flex-wrap justify-center gap-4'>
        <div className='w-5/12'>
          <PieChart chartId='b' serie='One Pace' />
        </div>

        {Object.keys(onePace).map((arc) => (
          <div key={arc} className='w-5/12'>
            <PieChart chartId={arc} serie={'One Pace'} arc={arc} />
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
