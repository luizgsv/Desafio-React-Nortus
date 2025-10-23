'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ApexOptions } from 'apexcharts';

// Importa o gráfico de forma dinâmica (só no client)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SegmentImpactCard() {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      toolbar: { show: false },
    },
    colors: [
      'oklch(0.63 0.24 250)', // azul forte (principal)
      'oklch(0.67 0.19 250)', // azul médio
      'oklch(0.72 0.14 250)', // azul claro
      'oklch(0.78 0.09 250)', // azul mais suave
      'oklch(0.83 0.05 250)', // azul quase acinzentado
    ],
    dataLabels: { enabled: false },
    legend: {
      show: false,
    },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
        },
      },
    },
    labels: ['Automóvel', 'Residencial', 'Viagem', 'Combo resi + auto', 'Profissional'],
  };

  const chartSeries = [35, 25, 15, 10, 15];

  return (
    <Card className="col-span-2 bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg ">
      <CardHeader className="text-center pb-2">
        <h2 className="text-lg font-semibold">Mapa de impacto por segmento</h2>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center gap-6">
        <Chart options={chartOptions} series={chartSeries} type="donut" height={140} />

        <section className="flex flex-wrap justify-center gap-2 text-sm">
          {chartOptions.labels &&
            chartOptions.labels.map((label, i) => (
              <div key={label} className="flex items-center gap-2 bg-secondary/40 p-2 rounded-full">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: chartOptions.colors ? chartOptions.colors[i] : 'bg-secondary',
                  }}
                />
                {label}
              </div>
            ))}
        </section>

        <Button className="mt-4 cursor-pointer text-white font-semibold rounded-full px-6 py-2 shadow-[var(--shadow-accent)] hover:bg-[#1565c0] transition-all">
          Analisar segmentos
        </Button>
      </CardContent>
    </Card>
  );
}
