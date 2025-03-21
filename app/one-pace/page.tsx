import React from 'react';
import onePace from '@/assets/one_pace.json';
import Display from '@/components/Display';

interface PageProps {
  searchParams: Promise<{
    chartType?: 'pie' | 'bar';
  }>;
}

const Page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const chartType = searchParams?.chartType || 'pie';

  return <Display serie={onePace} label='one-pace' chartType={chartType} />;
};

export default Page;
