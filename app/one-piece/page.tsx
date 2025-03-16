import React from 'react';
import onePiece from '@/assets/one_piece.json';
import Display from '@/components/Display';

interface PageProps {
  searchParams: {
    chartType?: 'pie' | 'bar';
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const chartType = searchParams?.chartType || 'pie';

  return <Display serie={onePiece} label='One Piece' chartType={chartType} />;
};

export default Page;
