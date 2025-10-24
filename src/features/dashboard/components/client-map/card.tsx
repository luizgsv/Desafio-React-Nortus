import { Card } from '@/components/ui/card';
import { ReactNode } from 'react';

export function CardClientMap({ children, filters }: { children: ReactNode; filters: ReactNode }) {
  return (
    <Card className="p-6 col-span-3 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className=" text-lg font-semibold">Map de clientes por região</h2>
        <article className="flex gap-2">{filters}</article>
      </div>
      {children}
    </Card>
  );
}
