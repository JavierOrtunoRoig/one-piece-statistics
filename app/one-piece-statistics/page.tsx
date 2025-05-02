import React from 'react';
import onePiece from '@/assets/one_piece.json';
import Display from '@/components/Display';

interface PageProps {
  searchParams?: {
    chartType?: 'pie' | 'bar';
  };
}

const Page = ({ searchParams }: PageProps) => {
  const chartType = searchParams?.chartType || 'pie';

  return <Display serie={onePiece} label='one-piece' chartType={chartType} />;
};

export default Page;
