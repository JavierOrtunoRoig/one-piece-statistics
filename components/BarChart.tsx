'use client';

import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import onePace from '@/assets/one_pace.json';
import onePiece from '@/assets/one_piece.json';
import {
  getAllArcsChartInformation,
  getAllSagasChartInformation,
  getTime,
} from '@/helpers/time';

// Registrar elementos necesarios para Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

interface BarChartProps {
  chartId: string;
  serie: 'One Piece' | 'One Pace';
  arc?: string;
}

const BarChart: FC<BarChartProps> = ({ chartId, serie, arc }) => {
  const serieToAnalyse: Serie = serie === 'One Piece' ? onePiece : onePace;

  let labels: string[] = [];
  let data: number[] = [];

  if (!arc) {
    const sagasChartInformation = getAllSagasChartInformation(serieToAnalyse);

    labels = sagasChartInformation.map((saga) => saga.label);
    data = sagasChartInformation.map((saga) => saga.duration);
  } else {
    const arcChartInformation = getAllArcsChartInformation(serieToAnalyse, arc);
    labels = arcChartInformation.map((arc) => arc.label);
    data = arcChartInformation.map((arc) => arc.duration);
  }

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
      legend: { display: false },
      tooltip: {
        bodyFont: { size: 13 },
        boxPadding: 4,
        boxWidth: 12,
        boxHeight: 12,
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => {
            const dataset = tooltipItem.dataset.data as number[];
            if (!dataset) throw new Error('Dataset not found');
            const total = dataset.reduce((acc, val) => acc + val, 0);
            const value = dataset[tooltipItem.dataIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${percentage}% - ${getTime(value, { type: 'short' })}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Duration (hours)' },
        ticks: {
          callback: function (value: string | number) {
            return ((value as number) / 3600).toFixed(0);
          },
        },
      },
    },
  };

  return <Bar id={chartId} data={chartData} options={options} />;
};

export default BarChart;
