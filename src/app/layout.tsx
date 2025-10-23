import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from '@/providers';
import 'maplibre-gl/dist/maplibre-gl.css';

const space_grotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Nortus | Inteligência para Vendas e Atendimento',
  description:
    'Nortus é uma plataforma de inteligência artificial para times de vendas e atendimento, com dashboards, visão 360° do cliente e gestão de tickets integrada.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${space_grotesk.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
