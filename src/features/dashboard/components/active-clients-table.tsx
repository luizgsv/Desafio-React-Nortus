'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Status = 'Ativo' | 'Pendente' | 'Inativo';

type ClientRow = {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  valorMensal: number; // em reais
  status: Status;
  renovacao: string; // dd/mm/aaaa
  regiao: string;
};

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const DATA: ClientRow[] = [
  {
    id: '1',
    nome: 'Ricardo Leite',
    email: 'ricardo@email.com',
    tipo: 'Seguro automóvel',
    valorMensal: 185.9,
    status: 'Ativo',
    renovacao: '14/12/2024',
    regiao: 'São Paulo',
  },
  {
    id: '2',
    nome: 'Maria Silva',
    email: 'mariasilva@email.com',
    tipo: 'Seguro residencial',
    valorMensal: 89.9,
    status: 'Ativo',
    renovacao: '14/12/2024',
    regiao: 'Rio de Janeiro',
  },
  {
    id: '3',
    nome: 'João Costa',
    email: 'costajoao@email.com',
    tipo: 'Seguro viagem',
    valorMensal: 230,
    status: 'Pendente',
    renovacao: '14/12/2024',
    regiao: 'Brasília',
  },
  {
    id: '4',
    nome: 'Residencial Premium',
    email: 'rpremium@email.com',
    tipo: 'Seguro residencial',
    valorMensal: 89.9,
    status: 'Ativo',
    renovacao: '14/12/2024',
    regiao: 'Pernambuco',
  },
  {
    id: '5',
    nome: 'Vida Empresarial',
    email: 'vidaempresarial@email.com',
    tipo: 'Seguro viagem',
    valorMensal: 230,
    status: 'Ativo',
    renovacao: '14/12/2024',
    regiao: 'Mato Grosso',
  },
  {
    id: '6',
    nome: 'Familia Total',
    email: 'familiatotal@email.com',
    tipo: 'Combo automóvel e residencial',
    valorMensal: 260,
    status: 'Ativo',
    renovacao: '14/12/2024',
    regiao: 'Paraíba',
  },
];

const statusClass = (status: Status) => {
  switch (status) {
    case 'Ativo':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-600/30';
    case 'Pendente':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-600/30';
    case 'Inativo':
      return 'bg-rose-500/20 text-rose-300 border-rose-600/30';
  }
};

export function ActiveClientsTable() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | Status>('all');
  const [tipo, setTipo] = useState<string>('all');
  const [regiao, setRegiao] = useState<string>('all');
  const [orderAsc, setOrderAsc] = useState(true);

  const tipos = useMemo(() => Array.from(new Set(DATA.map((d) => d.tipo))), []);
  const regioes = useMemo(() => Array.from(new Set(DATA.map((d) => d.regiao))), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = DATA.filter((r) => {
      const matchesQuery = q
        ? r.nome.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
        : true;
      const matchesStatus = status === 'all' ? true : r.status === status;
      const matchesTipo = tipo === 'all' ? true : r.tipo === tipo;
      const matchesRegiao = regiao === 'all' ? true : r.regiao === regiao;
      return matchesQuery && matchesStatus && matchesTipo && matchesRegiao;
    });
    rows = rows.sort((a, b) =>
      orderAsc ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome),
    );
    return rows;
  }, [query, status, tipo, regiao, orderAsc]);

  return (
    <Card className="bg-secondary/40 border border-zinc-800 rounded-3xl p-6 shadow-lg">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold">Clientes ativos</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-10 rounded-full bg-secondary/80 border-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger className="cursor-pointer w-fit h-10 rounded-full bg-secondary/80 text-foreground border-none shadow-sm px-4 hover:bg-secondary transition-all">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              <SelectItem value="all" className="cursor-pointer">
                Todos os status
              </SelectItem>
              <SelectItem value="Ativo" className="cursor-pointer">
                Ativo
              </SelectItem>
              <SelectItem value="Pendente" className="cursor-pointer">
                Pendente
              </SelectItem>
              <SelectItem value="Inativo" className="cursor-pointer">
                Inativo
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="cursor-pointer w-fit h-10 rounded-full bg-secondary/80 text-foreground border-none shadow-sm px-4 hover:bg-secondary transition-all">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              <SelectItem value="all" className="cursor-pointer">
                Todos os tipos
              </SelectItem>
              {tipos.map((t) => (
                <SelectItem key={t} value={t} className="cursor-pointer">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={regiao} onValueChange={setRegiao}>
            <SelectTrigger className="cursor-pointer w-fit h-10 rounded-full bg-secondary/80 text-foreground border-none shadow-sm px-4 hover:bg-secondary transition-all">
              <SelectValue placeholder="Todos os locais" />
            </SelectTrigger>
            <SelectContent className="bg-secondary text-foreground rounded-lg border border-border shadow-md">
              <SelectItem value="all" className="cursor-pointer">
                Todos os locais
              </SelectItem>
              {regioes.map((r) => (
                <SelectItem key={r} value={r} className="cursor-pointer">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabela */}
        <div className="bg-secondary/40 rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border/60">
                <th
                  className="text-left font-medium px-6 py-3 select-none cursor-pointer"
                  onClick={() => setOrderAsc((s) => !s)}
                >
                  Nome {orderAsc ? '↗' : '↘'}
                </th>
                <th className="text-left font-medium px-6 py-3">Tipo de Seguro</th>
                <th className="text-left font-medium px-6 py-3">Valor mensal</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-left font-medium px-6 py-3">Renovação</th>
                <th className="text-left font-medium px-6 py-3">Região</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-border/60">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium">{row.nome}</span>
                      <span className="text-muted-foreground text-xs">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-foreground font-medium">{row.tipo}</span>
                  </td>
                  <td className="px-6 py-4">{BRL.format(row.valorMensal)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium ${statusClass(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.renovacao}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{row.regiao}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <Button className="mt-2 cursor-pointer text-white font-semibold rounded-full px-6 py-2 shadow-lg hover:bg-[#1565c0] transition-all">
            Exportar CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
