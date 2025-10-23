'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export function MapFilters() {
  const [selected, setSelected] = useState('all');

  return (
    <>
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger
          className="cursor-pointer
          w-fit h-10 rounded-full bg-secondary/80 text-foreground 
          border-none shadow-sm px-4 flex items-center justify-between 
          hover:bg-secondary transition-all 
        "
        >
          <div className="flex items-center gap-2">
            <SelectValue />
          </div>
        </SelectTrigger>

        <SelectContent
          className="
          bg-secondary text-foreground rounded-lg border border-border 
          shadow-md animate-in fade-in-0 zoom-in-95 
        "
        >
          <SelectItem
            key="all"
            value="all"
            className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          >
            Todos os clientes
          </SelectItem>
        </SelectContent>
      </Select>
      <Select value={selected} onValueChange={setSelected}>
        <SelectTrigger
          className="cursor-pointer
          w-fit h-10 rounded-full bg-secondary/80 text-foreground 
          border-none shadow-sm px-4 flex items-center justify-between 
          hover:bg-secondary transition-all 
        "
        >
          <div className="flex items-center gap-2">
            <SelectValue />
          </div>
        </SelectTrigger>

        <SelectContent
          className="
          bg-secondary text-foreground rounded-lg border border-border 
          shadow-md animate-in fade-in-0 zoom-in-95 
        "
        >
          <SelectItem
            key="all"
            value="all"
            className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          >
            Todos os tipos
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
