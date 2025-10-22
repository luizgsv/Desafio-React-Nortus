'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BR, ES, FR, US } from 'country-flag-icons/react/3x2';
import * as React from 'react';

const languages = [
  { value: 'pt', label: 'PT-BR', Flag: BR },
  { value: 'en', label: 'EN-US', Flag: US },
  { value: 'es', label: 'ES-ES', Flag: ES },
  { value: 'fr', label: 'FR-FR', Flag: FR },
];

export function LanguageSelect() {
  const [selected, setSelected] = React.useState('pt');
  const current = languages.find((l) => l.value === selected)!;

  return (
    <Select value={selected} onValueChange={setSelected}>
      <SelectTrigger
        className="cursor-pointer
          w-[130px] h-10 rounded-full bg-secondary/80 text-foreground 
          border-none shadow-sm px-4 flex items-center justify-between 
          hover:bg-secondary transition-all 
        "
      >
        <div className="flex items-center gap-2">
          <SelectValue placeholder={current.label} />
        </div>
      </SelectTrigger>

      <SelectContent
        className="
          bg-secondary text-foreground rounded-lg border border-border 
          shadow-md animate-in fade-in-0 zoom-in-95
        "
      >
        {languages.map(({ value, label, Flag }) => (
          <SelectItem
            key={value}
            value={value}
            className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          >
            <div className="flex items-center gap-2">
              <Flag title={label} className="w-5 h-4 rounded-sm" />
              <span>{label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
