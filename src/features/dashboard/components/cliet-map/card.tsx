import { ReactNode } from 'react';

export function CardClientMap({ children, filters }: { children: ReactNode; filters: ReactNode }) {
  return (
    <section className="bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg col-span-3 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className=" text-lg font-semibold">Map de clientes por região</h2>
        <article className="flex gap-2">{filters}</article>
      </div>

      {children}
    </section>
  );
}
