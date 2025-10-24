'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-4 text-center animate-in fade-in duration-300">
      <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-accent border-t-transparent animate-spin">
        <Loader2 size={32} className="text-accent" />
      </div>

      <h2 className="text-lg font-medium text-primary">Carregando...</h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        Aguarde enquanto carregamos as informações.
      </p>
    </main>
  );
}
