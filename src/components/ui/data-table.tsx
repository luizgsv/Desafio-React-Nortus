'use client';

import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

// 🔧 Tornamos key mais flexível (pode ser string qualquer, não precisa ser exatamente keyof T)
export type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  emptyMessage = 'Nenhum resultado encontrado.',
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={cn('bg-secondary/40 rounded-2xl border border-border overflow-hidden', className)}
    >
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/60 text-muted-foreground">
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={cn('px-6 py-3 text-left font-medium', col.className)}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id} className="border-b border-border/60">
                {columns.map((col) => (
                  <TableCell key={String(col.key)} className="px-6 py-4">
                    {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="px-6 py-12 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
