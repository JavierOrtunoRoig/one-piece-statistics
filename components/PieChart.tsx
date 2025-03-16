'use client';

import React, { FC } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import onePace from '@/assets/one_pace.json';
import onePiece from '@/assets/one_piece.json';
import { getTime } from '@/helpers/time';

// Registrar elementos necesarios para Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4CAF50',
  '#9966FF',
  '#FF9F40',

  '#2ECC71',
  '#F39C12',
  '#8E44AD',
  '#E74C3C',
  '#1ABC9C',
  '#3498DB',
];

interface PieChartProps {
  chartId: string;
  serie: 'One Piece' | 'One Pace';
  arc?: string;
}

const PieChart: FC<PieChartProps> = ({ chartId, serie, arc }) => {
  const serieToAnalyse: Serie = serie === 'One Piece' ? onePiece : onePace;
  const sagasWithArcs = Object.entries(serieToAnalyse).map(
    ([sagaName, arcs]) => {
      return {
        title: sagaName,
        duration: Object.entries(arcs).map(([arcName, episodes]) => {
          return {
            title: arcName,
            duration: episodes.reduce((sum, ep) => sum + ep.duration, 0),
          };
        }),
      };
    },
  );

  const sagasDurations = sagasWithArcs
    .map((saga) => {
      return {
        title: saga.title,
        duration: saga.duration.reduce((sum, arc) => sum + arc.duration, 0),
      };
    })
    .sort((a, b) => b.duration - a.duration);

  const selectedArc = sagasWithArcs.find((saga) => saga.title === arc);
  const arcDurations =
    selectedArc?.duration
      .sort((a, b) => b.duration - a.duration)
      .map((arc) => arc.duration) || [];
  const arcLabels =
    selectedArc?.duration
      .sort((a, b) => b.duration - a.duration)
      .map((arc) => arc.title) || [];

  const labels = arc ? arcLabels : sagasDurations.map((arc) => arc.title);
  const data = arc ? arcDurations : sagasDurations.map((arc) => arc.duration);
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: COLORS,
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        bodyFont: { size: 13 },
        boxPadding: 4,
        boxWidth: 12,
        boxHeight: 12,
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>) => {
            const dataset = tooltipItem.dataset.data;
            const total = dataset.reduce((acc, val) => acc + val, 0);
            const value = dataset[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${percentage}% - ${getTime(value, { type: 'short' })}`;
          },
        },
      },
    },
  };

  return <Pie id={chartId} data={chartData} options={options} />;
};

export default PieChart;
