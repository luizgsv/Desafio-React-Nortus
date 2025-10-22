'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface KpiCardProps {
  title: string;
  value: string;
  variation: string;
  positive?: 'up' | 'down';
}

export function KpiStats() {
  const cards: KpiCardProps[] = [
    {
      title: 'ARPU',
      value: 'R$ 320,50',
      variation: '+12% no período',
      positive: 'up',
    },
    {
      title: 'Conversão IA',
      value: '68,5%',
      variation: '+8,2% no período',
    },
    {
      title: 'Retenção',
      value: '85%',
      variation: '+2,5% no período',
    },
    {
      title: 'Taxa de Churn',
      value: '3,2%',
      variation: '-1,5% no período',
      positive: 'down',
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

function KpiCard({ title, value, variation, positive }: KpiCardProps) {
  return (
    <div
      className="relative overflow-hidden
        bg-[#0B1120]
        rounded-2xl
        p-6
        w-full
        shadow-md
        border border-[#1E293B]
        flex flex-col justify-between
      "
    >
      <div>
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <p className="text-white text-2xl font-semibold">{value}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={cn('text-sm font-medium', positive ? 'text-green-500' : 'text-red-400')}>
          {variation}
        </span>
        {positive === 'up' && (
          <Image
            className="absolute -bottom-2 right-2 object-cover
            brightness-110 saturate-150
            drop-shadow-[0_0_4px_#1565c0]"
            src="/img/arrow-up.png"
            alt="arrow-up"
            height={73}
            width={73}
          />
        )}
        {positive === 'down' && (
          <Image
            className="absolute bottom-0 right-0 brightness-110 saturate-150
            drop-shadow-[0_0_4px_#c01515]"
            src="/img/arrow-down.png"
            alt="arrow-down"
            height={82}
            width={82}
          />
        )}
      </div>
    </div>
  );
}
