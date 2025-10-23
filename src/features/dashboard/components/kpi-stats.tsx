'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { memo } from 'react';
import { DashboardResponse } from '../models/types/response-dashboard';

type Props = {
  data: DashboardResponse['kpisResume'];
};

type KpiCardProps = {
  title: string;
  value: string;
  variation: string;
  positive?: 'up' | 'down';
};

export function KpiStats({ data }: Props) {
  const cards: KpiCardProps[] = [
    {
      title: 'ARPU',
      value: `R$ ${data.arpu.valor.toFixed(2)}`,
      variation: `${data.arpu.variacao > 0 ? '+' : ''}${data.arpu.variacao}% no período`,
      positive: data.arpu.variacao > 0 ? 'up' : 'down',
    },
    {
      title: 'Conversão IA',
      value: `${data.conversion.valor.toFixed(1)}%`,
      variation: `${data.conversion.variacao > 0 ? '+' : ''}${data.conversion.variacao}% no período`,
      positive: data.conversion.variacao > 0 ? 'up' : 'down',
    },
    {
      title: 'Retenção',
      value: `${data.retention.valor.toFixed(1)}%`,
      variation: `${data.retention.variacao > 0 ? '+' : ''}${data.retention.variacao}% no período`,
      positive: data.retention.variacao > 0 ? 'up' : 'down',
    },
    {
      title: 'Taxa de Churn',
      value: `${data.churn.valor.toFixed(1)}%`,
      variation: `${data.churn.variacao > 0 ? '+' : ''}${data.churn.variacao}% no período`,
      positive: data.churn.variacao > 0 ? 'up' : 'down',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 col-span-2 w-full max-w-2xl mx-auto">
      {cards.map((card) => (
        <KpiCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export const KpiCard = memo(function KpiCard({ title, value, variation, positive }: KpiCardProps) {
  return (
    <div
      className="relative overflow-hidden
        bg-[#0B1120]
        rounded-2xl
        p-6
        w-full
        shadow-md
        border border-zinc-800
        flex flex-col justify-between
      "
    >
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <p className="text-white text-2xl font-semibold">{value}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span
          className={cn(
            'text-sm font-medium',
            positive === 'up' ? 'text-green-500' : 'text-red-400',
          )}
        >
          {variation}
        </span>

        {positive === 'up' && (
          <Image
            className="absolute -bottom-2 right-2 object-cover brightness-110 saturate-150 drop-shadow-[0_0_4px_#1565c0]"
            src="/img/arrow-up.png"
            alt="arrow-up"
            height={73}
            width={73}
          />
        )}
        {positive === 'down' && (
          <Image
            className="absolute bottom-0 right-0 brightness-110 saturate-150 drop-shadow-[0_0_4px_#c01515]"
            src="/img/arrow-down.png"
            alt="arrow-down"
            height={82}
            width={82}
          />
        )}
      </div>
    </div>
  );
});
