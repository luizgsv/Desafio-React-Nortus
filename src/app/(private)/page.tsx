import { ClientMap } from '@/features/dashboard/components/cliet-map';
import { KpiGraph } from '@/features/dashboard/components/kpi-graph';
import { KpiStats } from '@/features/dashboard/components/kpi-stats';
import { SegmentImpactCard } from '@/features/dashboard/components/segment-impact-card';
import { ActiveClientsTable } from '@/features/dashboard/components/active-clients-table';

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-5 gap-8">
        <KpiGraph />
        <KpiStats />
        <ClientMap />
        <SegmentImpactCard />
      </section>

      <section className="mt-8">
        <ActiveClientsTable />
      </section>
    </main>
  );
}
