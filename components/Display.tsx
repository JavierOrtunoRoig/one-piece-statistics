import Link from 'next/link';
import React, { FC } from 'react';
import Chart from './Chart';

interface DisplayProps {
  serie: Serie;
  label: 'one-piece' | 'one-pace' | 'comparation';
  chartType: 'bar' | 'pie';
}

const Display: FC<DisplayProps> = ({ serie, label, chartType = 'pie' }) => {
  const anotherSerie = `/${label === 'one-piece' ? 'one-pace' : 'one-piece'}`;
  const currentSerie = `/${label}`;
  const anotherSerieLabel = label === 'one-piece' ? 'One Pace' : 'One Piece';

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

        <Link
          href={'/comparation'}
          className='rounded-lg bg-violet-700 p-2 transition-all duration-300 hover:scale-110 hover:bg-violet-900'
        >
          Comparation Statistics
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
      <div className='flex w-full flex-wrap justify-center gap-6'>
        <div className='w-full lg:w-5/12 xl:w-3/12'>
          {chartType === 'pie' ? (
            <Chart
              chartId='totalSagasHours'
              serieData={serie}
              type='PIE'
              comparation={label === 'comparation'}
            />
          ) : (
            <Chart
              chartId='totalSagasHours'
              serieData={serie}
              type='BAR'
              comparation={label === 'comparation'}
            />
          )}
        </div>

        {Object.keys(serie).map((arc) => (
          <div key={arc} className='w-full lg:w-5/12 xl:w-3/12'>
            {chartType === 'pie' ? (
              <Chart
                chartId={arc}
                serieData={serie}
                arc={arc}
                type='PIE'
                comparation={label === 'comparation'}
              />
            ) : (
              <Chart
                chartId={arc}
                serieData={serie}
                arc={arc}
                type='BAR'
                comparation={label === 'comparation'}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
