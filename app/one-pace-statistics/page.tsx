import React from 'react';
import onePace from '@/assets/one_pace.json';
import Display from '@/components/Display';

interface PageProps {
  searchParams?: {
    chartType?: 'pie' | 'bar';
  };
}

const Page = ({ searchParams }: PageProps) => {
  const chartType = searchParams?.chartType || 'pie';

  return <Display serie={onePace} label='one-pace' chartType={chartType} />;
};

export default Page;
