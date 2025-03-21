'use client';

import React, { FC } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import {
  getAllArcsChartInformation,
  getAllSagasChartInformation,
  getSerieTotalTime,
  getTime,
} from '@/helpers/time';

import onePace from '@/assets/one_pace.json';
import onePiece from '@/assets/one_piece.json';

// Registrar elementos necesarios para Chart.js

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
  arc?: string;
  serieData: Serie;
  type: 'PIE' | 'BAR';
  comparation: boolean;
}

const Chart: FC<PieChartProps> = ({
  chartId,
  arc,
  serieData,
  type,
  comparation,
}) => {
  let labels: string[] = [];
  let data: number[] = [];

  if (type === 'PIE') {
    ChartJS.register(ArcElement, Tooltip, Legend);
  } else {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  }

  if (!arc && !comparation) {
    const sagasChartInformation = getAllSagasChartInformation(serieData).sort(
      (a, b) => b.duration - a.duration,
    );

    labels = sagasChartInformation.map((saga) => saga.label);
    data = sagasChartInformation.map((saga) => saga.duration);
  } else if (arc && !comparation) {
    const arcChartInformation = getAllArcsChartInformation(serieData, arc).sort(
      (a, b) => b.duration - a.duration,
    );
    labels = arcChartInformation.map((arc) => arc.label);
    data = arcChartInformation.map((arc) => arc.duration);
  } else if (!arc && comparation) {
    const totalOnePiece = getSerieTotalTime(onePiece);
    const totalOnePace = getSerieTotalTime(onePace);
    labels = ['One Piece', 'One Pace'];
    data = [totalOnePiece, totalOnePace];
  } else if (arc && comparation) {
    console.log({ arc });
    const sagasChartInformationOnePiece = getAllArcsChartInformation(
      onePiece,
      arc,
    );
    const sagasChartInformationOnePace = getAllArcsChartInformation(
      onePace,
      arc,
    );
    labels = [arc, arc];
    data = [
      sagasChartInformationOnePiece.reduce((acc, val) => acc + val.duration, 0),
      sagasChartInformationOnePace.reduce((acc, val) => acc + val.duration, 0),
    ];
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Duration',
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

  const barOptions = {
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

  console.log({ optios: { ...options, ...barOptions } });

  return type === 'PIE' ? (
    <Pie id={chartId} data={chartData} options={options} />
  ) : (
    <Bar
      id={chartId}
      data={chartData}
      options={{ ...options, ...barOptions }}
    />
  );
};

export default Chart;
