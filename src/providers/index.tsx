import { ReactNode } from 'react';
import { NextThemesProvider } from './next-themes';
import { SonnerProvider } from './sonner';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider>
      <SonnerProvider />
      {children}
    </NextThemesProvider>
  );
}
