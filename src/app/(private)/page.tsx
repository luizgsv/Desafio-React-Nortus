import { ActiveClientsTable } from '@/features/dashboard/components/active-clients-table';
import { ClientMap } from '@/features/dashboard/components/client-map';
import { KpiGraph } from '@/features/dashboard/components/kpi-graph';
import { KpiStats } from '@/features/dashboard/components/kpi-stats';
import { SegmentImpactCard } from '@/features/dashboard/components/segment-impact-card';
import { getAllDashboardData } from '@/features/dashboard/services/get-dashboard.service';
import { getAllMapData } from '@/features/dashboard/services/get-map.service';

export default async function Home() {
  try {
    const [dashboardData, mapData] = await Promise.all([getAllDashboardData(), getAllMapData()]);

    if (!dashboardData || !mapData) {
      return (
        <main className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
          <p>Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.</p>
        </main>
      );
    }

    return (
      <main>
        <section className="grid grid-cols-5 gap-8">
          <KpiGraph data={dashboardData.kpisTrend} />
          <KpiStats data={dashboardData.kpisResume} />
          <ClientMap data={mapData.data} />
          <SegmentImpactCard data={dashboardData.segments} />
        </section>

        <section className="mt-8">
          <ActiveClientsTable data={dashboardData.activeClients} />
        </section>
      </main>
    );
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error);
    return (
      <main className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        <p>Ocorreu um erro ao carregar o dashboard.</p>
      </main>
    );
  }
}
