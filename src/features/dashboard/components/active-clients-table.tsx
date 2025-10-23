'use client';

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
import { ArrowDownIcon, ArrowUpIcon, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { DashboardResponse } from '../models/types/response-dashboard';

type Props = {
  data: DashboardResponse['activeClients'];
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Ativo':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-600/30';
    case 'Pendente':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-600/30';
    case 'Inativo':
      return 'bg-rose-500/20 text-rose-300 border-rose-600/30';
    default:
      return 'bg-secondary text-foreground border-border/40';
  }
};

export function ActiveClientsTable({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [regionFilter, setRegionFilter] = useState('Todos');
  const [isAscending, setIsAscending] = useState(true);

  const filters = data.filters;
  const clients = data.data;

  const filteredClients = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return clients
      .filter((client) => {
        const matchesSearch =
          search === '' ||
          client.name.toLowerCase().includes(search) ||
          client.email.toLowerCase().includes(search);
        const matchesStatus = statusFilter === 'Todos' || client.status === statusFilter;
        const matchesType = typeFilter === 'Todos' || client.secureType === typeFilter;
        const matchesRegion = regionFilter === 'Todos' || client.location === regionFilter;
        return matchesSearch && matchesStatus && matchesType && matchesRegion;
      })
      .sort((a, b) => (isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  }, [clients, searchTerm, statusFilter, typeFilter, regionFilter, isAscending]);

  const columns = useMemo(() => {
    type Client = (typeof clients)[0];

    return [
      {
        key: 'name',
        header: (
          <span
            onClick={() => setIsAscending((prev) => !prev)}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            Nome {isAscending ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />}
          </span>
        ),
        render: (client: Client) => (
          <div className="flex flex-col">
            <span className="text-foreground font-medium">{client.name}</span>
            <span className="text-muted-foreground text-xs">{client.email}</span>
          </div>
        ),
      },
      { key: 'secureType', header: 'Tipo de Seguro' },
      {
        key: 'monthValue',
        header: 'Valor Mensal',
        render: (client: Client) => currencyFormatter.format(client.monthValue),
      },
      {
        key: 'status',
        header: 'Status',
        render: (client: Client) => (
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium',
              getStatusClass(client.status),
            )}
          >
            {client.status}
          </span>
        ),
      },
      { key: 'renewalDate', header: 'Renovação' },
      { key: 'location', header: 'Região' },
    ];
  }, [clients, isAscending]);

  return (
    <Card className="bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold">Clientes Ativos</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 rounded-full bg-secondary/80 border-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="cursor-pointer w-fit h-10 rounded-full bg-secondary/80 text-foreground border-none shadow-sm px-4 hover:bg-secondary transition-all">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              {filters.status.map((status) => (
                <SelectItem key={status} value={status} className="cursor-pointer">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="cursor-pointer w-fit h-10 rounded-full bg-secondary/80 text-foreground border-none shadow-sm px-4 hover:bg-secondary transition-all">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              {filters.secureType.map((type) => (
                <SelectItem key={type} value={type} className="cursor-pointer">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="cursor-pointer w-fit h-10 rounded-full bg-secondary/80 text-foreground border-none shadow-sm px-4 hover:bg-secondary transition-all">
              <SelectValue placeholder="Todas as regiões" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              {filters.locations.map((region) => (
                <SelectItem key={region} value={region} className="cursor-pointer">
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DataTable columns={columns} data={filteredClients} />
      </CardContent>
    </Card>
  );
}
