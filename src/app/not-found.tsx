'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 border border-border">
          <Frown size={32} className="text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-semibold text-primary">Página não encontrada</h1>
        <p className="text-muted-foreground max-w-md">
          O endereço que você tentou acessar não existe ou foi movido. Verifique o link ou volte
          para a página inicial.
        </p>

        <Link href="/" passHref className="mt-4">
          <Button className=" cursor-pointer  rounded-full px-6 bg-accent text-white shadow-(--shadow-accent) hover:bg-accent/80 transition-all">
            Voltar para o início
          </Button>
        </Link>
      </div>
    </main>
  );
}
