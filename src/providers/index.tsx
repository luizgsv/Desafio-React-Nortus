import { ReactNode } from 'react';
import { NextThemesProvider } from './next-themes';
import { SonnerProvider } from './sonner';
import { UseQueryProvider } from './use-query';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider>
      <UseQueryProvider>
        <SonnerProvider />
        {children}
      </UseQueryProvider>
    </NextThemesProvider>
  );
}
