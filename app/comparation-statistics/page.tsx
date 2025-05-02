// comparation/page.tsx
import React from 'react';
import onePiece from '@/assets/one_pace.json';
import Display from '@/components/Display';

interface PageProps {
  searchParams: Promise<{
    chartType?: 'pie' | 'bar';
  }>;
}

const Page = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const chartType = searchParams?.chartType || 'pie';

  return <Display serie={onePiece} label='comparation' chartType={chartType} />;
};

export default Page;
