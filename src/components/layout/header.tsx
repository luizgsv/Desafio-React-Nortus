'use client';

import { definePageTitleByPathname } from '@/utils/define-page-title';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CreateTicketButton = dynamic(
  () =>
    import('../../features/tickets/components/create-ticket-button').then(
      ({ CreateTicketButton }) => CreateTicketButton,
    ),
  { ssr: false },
);

export function Header() {
  const pathname = usePathname();
  const isTicketPage = pathname.includes('tickets');

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-10
        h-20 border-b border-sidebar-border bg-secondary/90 
        backdrop-blur-md flex items-center justify-between px-40
      "
    >
      <h1 className="text-lg font-semibold text-primary">{definePageTitleByPathname()}</h1>
      {isTicketPage && <CreateTicketButton />}
    </header>
  );
}
