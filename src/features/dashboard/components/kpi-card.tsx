'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function KpiCard() {
  const [active, setActive] = useState('ARPU');
  const filters = ['Retenção', 'Conversão', 'Churn', 'ARPU'];

  const series = [
    {
      name: active,
      data: [90, 110, 160, 190, 150, 120, 130, 140, 200, 260, 240, 220],
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#94A3B8',
      background: 'transparent',
    },
    stroke: {
      curve: 'smooth',
      width: 1,
      colors: ['#45b5d76b'], // cor com transparência leve
    },
    fill: {
      type: 'solid',
      colors: ['#11bed582'], // cor com transparência leve
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.08)',
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `R$ ${val.toFixed(1)}k`,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      labels: { style: { colors: '#64748B' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      max: 380,
      tickAmount: 4,
      labels: { style: { colors: '#64748B' } },
    },
  };

  return (
    <div className="bg-secondary/40 border border-zinc-600 rounded-3xl p-6 shadow-lg col-span-3 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className=" text-lg font-semibold">Evolução dos KPI&apos;s</h2>

        <div className="flex gap-2 p-2 rounded-full bg-secondary/50">
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActive(filter)}
              className={cn(
                'px-4 py-1 rounded-full text-sm transition-all cursor-pointer',
                active === filter
                  ? 'bg-accent hover:bg-accent/20 text-white shadow-[0_0_8px_rgba(0,194,255,0.4)]'
                  : 'bg-secondary hover:bg-secondary/40 text-gray-400 hover:text-white',
              )}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <Chart options={options} series={series} type="area" height={300} />
    </div>
  );
}
