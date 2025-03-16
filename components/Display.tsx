import Link from 'next/link';
import React, { FC } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';

interface DisplayProps {
  serie: Serie;
  label: 'One Piece' | 'One Pace';
  chartType: 'bar' | 'pie';
}

const Display: FC<DisplayProps> = ({ serie, label, chartType = 'pie' }) => {
  const anotherSerie = `/${label !== 'One Piece' ? 'one-piece' : 'one-pace'}`;
  const currentSerie = `/${label === 'One Piece' ? 'one-piece' : 'one-pace'}`;
  const anotherSerieLabel = label === 'One Piece' ? 'One Pace' : 'One Piece';

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
          href={anotherSerie}
          className='rounded-lg bg-violet-700 p-2 transition-all duration-300 hover:scale-110 hover:bg-violet-900'
        >
          {anotherSerieLabel} Statistics
        </Link>

        {/* change chart type */}
        <Link
          href={
            chartType === 'pie'
              ? `${currentSerie}?chartType=bar`
              : `${currentSerie}?chartType=pie`
          }
          className='rounded-lg bg-violet-700 p-2 transition-all duration-300 hover:scale-110 hover:bg-violet-900'
        >
          {chartType === 'pie' ? 'Bar Chart' : 'Pie Chart'}
        </Link>
      </div>
      <div className='flex w-full flex-wrap justify-center gap-4'>
        <div className='w-5/12'>
          {chartType === 'pie' ? (
            <PieChart chartId='totalSagasHours' serie={label} />
          ) : (
            <BarChart chartId='totalSagasHours' serie={label} />
          )}
        </div>

        {Object.keys(serie).map((arc) => (
          <div key={arc} className='w-5/12'>
            {chartType === 'pie' ? (
              <PieChart chartId={arc} serie={label} arc={arc} />
            ) : (
              <BarChart chartId={arc} serie={label} arc={arc} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
