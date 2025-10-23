'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { DashboardResponse } from '../models/types/response-dashboard';
import { Card } from '@/components/ui/card';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
  data: DashboardResponse['kpisTrend'];
};

export function KpiGraph({ data }: Props) {
  const filters = ['ARPU', 'Conversão', 'Churn', 'Retenção'];
  const [active, setActive] = useState(filters[0]);

  const currentSeries = useMemo(() => {
    switch (active.toLowerCase()) {
      case 'arpu':
        return data.arpuTrend;
      case 'conversão':
        return data.conversionTrend;
      case 'churn':
        return data.churnTrend;
      case 'retenção':
        return data.retentionTrend;
      default:
        return data.arpuTrend;
    }
  }, [active, data]);

  const series = [
    {
      name: currentSeries.name,
      data: currentSeries.data,
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
      width: 2,
      colors: ['#45b5d76b'],
    },
    fill: {
      type: 'solid',
      colors: ['#11bed582'],
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.08)',
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) =>
          active === 'ARPU' ? `R$ ${val.toFixed(2)}` : `${val.toFixed(1)}%`,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: data.labels,
      labels: { style: { colors: '#64748B' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: '#64748B' } },
    },
  };

  return (
    <Card className="p-6 col-span-3 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Evolução dos KPI&apos;s</h2>

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
    </Card>
  );
}
