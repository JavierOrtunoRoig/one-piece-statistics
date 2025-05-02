// components/Display.tsx
import React, { FC } from 'react';
import Chart from './Chart';
import { NavButton } from './NavButton';
import {
  BarChart2,
  PieChart,
  Home,
  Shuffle,
  Film,
  FastForward,
} from 'lucide-react';

interface DisplayProps {
  serie: Serie;
  label: 'one-piece' | 'one-pace' | 'comparation';
  chartType: 'bar' | 'pie';
}

const Display: FC<DisplayProps> = ({ serie, label, chartType = 'pie' }) => {
  const currentSerie = `/${label}-statistics`;

  return (
    <div className='flex flex-col items-center justify-center'>
      <header className='flex w-full items-center justify-center p-4'>
        <h1 className='text-4xl font-bold'>{`${label.split('-').join(' ').charAt(0).toUpperCase() + label.split('-').join(' ').slice(1)} Statistics`}</h1>
      </header>
      <div className='flex flex-wrap items-center justify-center gap-2 p-8'>
        <NavButton href='/' icon={<Home size={16} />} label='Home' />

        <NavButton
          href='/one-piece-statistics'
          icon={<Film size={16} />}
          label='One Piece Statistics'
        />

        <NavButton
          href='/one-pace-statistics'
          icon={<FastForward size={16} />}
          label='One Pace Statistics'
        />

        <NavButton
          href='/comparation-statistics'
          icon={<Shuffle size={16} />}
          label='Comparation Statistics'
        />

        <NavButton
          href={
            chartType === 'pie'
              ? `${currentSerie}?chartType=bar`
              : `${currentSerie}?chartType=pie`
          }
          icon={
            chartType === 'pie' ? (
              <BarChart2 size={16} />
            ) : (
              <PieChart size={16} />
            )
          }
          label={chartType === 'pie' ? 'Bar Chart' : 'Pie Chart'}
        />
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
    </div>
  );
};

export default Display;
