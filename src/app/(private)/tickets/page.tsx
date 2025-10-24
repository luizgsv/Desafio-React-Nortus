import { StatusCard } from '@/features/tickets/components/status-tickets-card';
import { TicketsTable } from '@/features/tickets/components/tickets-table';
import { getAllTicketsData } from '@/features/tickets/services/get-tickets.service';

export default async function Tickets() {
  const [tickets] = await Promise.all([getAllTicketsData()]);

  if (!tickets) {
    return (
      <main className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        <p>Não foi possível carregar os dados de tickets. Tente novamente mais tarde.</p>
      </main>
    );
  }

  try {
    return (
      <main>
        <section className="grid grid-cols-4 gap-8">
          <StatusCard
            icon="/icon/open-ticket.svg"
            title={'Tickets Abertos'}
            value={tickets.resumo.open ?? 0}
          />
          <StatusCard
            icon="/icon/pending-ticket.svg"
            title="Em andamento"
            value={tickets.resumo.inProgress ?? 0}
          />
          <StatusCard
            icon="/icon/done-ticket.svg"
            title="Resolvidos hoje"
            value={tickets.resumo.solved ?? 0}
          />
          <StatusCard
            icon="/icon/temp-ticket.svg"
            title="Tempo Médio"
            value={tickets.resumo.timeAverageHours ?? 0}
          />
        </section>

        <section className="mt-8">
          <TicketsTable data={tickets} />
        </section>
      </main>
    );
  } catch (error) {
    console.error('Erro ao carregar tickets:', error);
    return (
      <main className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        <p>Ocorreu um erro ao carregar o tickets.</p>
      </main>
    );
  }
}
