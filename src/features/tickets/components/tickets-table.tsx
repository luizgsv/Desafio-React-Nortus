'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  PencilLineIcon,
  Search,
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { TicketResponse } from '../models/tickets-response';
import { useTicketsStore } from '../store/tickets.store';

type Props = {
  data: TicketResponse;
};

export function TicketsTable({ data }: Props) {
  const {
    filteredTickets,
    currentPage,
    totalPages,
    pageSize,
    searchTerm,
    statusFilter,
    priorityFilter,
    responsibleFilter,
    setTickets,
    setSearchTerm,
    setStatusFilter,
    setPriorityFilter,
    setResponsibleFilter,
    filterTickets,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
  } = useTicketsStore();

  useEffect(() => {
    setTickets(data.tickets);
  }, [data.tickets, setTickets]);

  useEffect(() => {
    filterTickets();
  }, [searchTerm, statusFilter, priorityFilter, responsibleFilter, filterTickets]);

  const currentTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTickets.slice(startIndex, endIndex);
  }, [filteredTickets, currentPage, pageSize]);

  const columns = useMemo(() => {
    type Ticket = (typeof currentTickets)[0];

    return [
      { key: 'id', header: 'ID' },
      {
        key: 'priority',
        header: 'Prioridade',
        render: (ticket: Ticket) => {
          const colorClass =
            ticket.priority === 'Urgente'
              ? 'bg-rose-500/20 text-rose-300 border-rose-600/30'
              : ticket.priority === 'Média'
                ? 'bg-sky-500/20 text-sky-300 border-sky-600/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-600/30';

          return (
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium',
                colorClass,
              )}
            >
              {ticket.priority}
            </span>
          );
        },
      },
      {
        key: 'client',
        header: 'Cliente',
        render: (ticket: Ticket) => (
          <div className="flex flex-col">
            <span className="text-foreground font-medium">{ticket.client}</span>
            <span className="text-muted-foreground text-xs">{ticket.email}</span>
          </div>
        ),
      },
      { key: 'subject', header: 'Assunto' },
      {
        key: 'status',
        header: 'Status',
        render: (ticket: Ticket) => {
          const statusColorClass =
            ticket.status === 'Aberto'
              ? 'bg-sky-400/20 text-sky-400'
              : ticket.status === 'Em andamento'
                ? 'bg-yellow-300/20 text-yellow-300'
                : 'bg-emerald-300/20 text-emerald-300';

          return (
            <span
              className={cn(
                'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium',
                statusColorClass,
              )}
            >
              {ticket.status}
            </span>
          );
        },
      },
      { key: 'createdAt', header: 'Criado em' },
      { key: 'responsible', header: 'Responsável' },
      {
        key: 'actions',
        header: 'Ações',
        render: () => (
          <div className="flex items-center justify-start gap-4">
            <Button className="flex bg-transparent cursor-pointer items-center gap-2 text-accent hover:bg-transparent hover:opacity-65 transition-colors">
              <span className="text-sm font-medium">Editar</span>
              <PencilLineIcon size={14} />
            </Button>

            <Button className="flex bg-transparent cursor-pointer items-center gap-2 text-accent hover:bg-transparent hover:opacity-65 transition-colors">
              <span className="text-sm font-medium">Ver</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        ),
      },
    ];
  }, [currentTickets]);

  return (
    <Card className="bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold">Lista de Tickets</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, cliente ou assunto..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-9 h-10 rounded-full bg-secondary/80 border-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="cursor-pointer rounded-full bg-secondary/80 border-none px-4">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              <SelectItem value="Todos">Todos os status</SelectItem>
              {data.status.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="cursor-pointer rounded-full bg-secondary/80 border-none px-4">
              <SelectValue placeholder="Todas as prioridades" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              <SelectItem value="Todos">Todas as prioridades</SelectItem>
              {data.priorities.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
            <SelectTrigger className="cursor-pointer rounded-full bg-secondary/80 border-none px-4">
              <SelectValue placeholder="Todos os responsáveis" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              <SelectItem value="Todos">Todos os responsáveis</SelectItem>
              {[...new Set(data.tickets.map((ticket) => ticket.responsible))].map((responsible) => (
                <SelectItem key={responsible} value={responsible}>
                  {responsible}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DataTable columns={columns} data={currentTickets} />

        <div className="flex justify-end pt-4 text-sm">
          <div className="flex items-center gap-2">
            <Button
              className="bg-transparent"
              size="sm"
              onClick={firstPage}
              disabled={currentPage === 1}
            >
              <ChevronFirst size={16} />
            </Button>
            <Button
              className="bg-transparent"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <span>
              Página {currentPage} de {totalPages || 1}
            </span>
            <Button
              className="bg-transparent"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight size={16} />
            </Button>
            <Button
              className="bg-transparent"
              size="sm"
              onClick={lastPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronLast size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
