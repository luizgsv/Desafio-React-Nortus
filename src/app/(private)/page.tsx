import { KpiCard } from '@/features/dashboard/components/kpi-card';
import { KpiStats } from '@/features/dashboard/components/kpi-stats';

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-5 gap-8">
        <KpiCard />
        <KpiStats />
        <div className="bg-red-300 h-5 w-5"></div>
        <div className="bg-red-300 h-5 w-5"></div>
      </section>
    </main>
  );
}
