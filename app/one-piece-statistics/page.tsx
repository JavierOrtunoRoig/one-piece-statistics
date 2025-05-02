// one-piece-statistics/page.tsx
import React from 'react';
import onePiece from '@/assets/one_piece.json';
import Display from '@/components/Display';

interface PageProps {
  searchParams: Promise<{
    chartType?: 'pie' | 'bar';
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { chartType } = await searchParams;

  return <Display serie={onePiece} label='one-piece' chartType={chartType} />;
};

export default Page;
