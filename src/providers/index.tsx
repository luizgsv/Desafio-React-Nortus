import { ReactNode } from 'react';
import { NextThemesProvider } from './next-themes';
import { SonnerProvider } from './sonner';
import { UseQueryProvider } from './use-query';
import { Analytics } from '@vercel/analytics/next';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider>
      <UseQueryProvider>
        <SonnerProvider />
        <Analytics />
        {children}
      </UseQueryProvider>
    </NextThemesProvider>
  );
}
