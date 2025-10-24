'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/features/login/hook/use-logout';
import { useLocalStorage } from '@/hooks/local-storage';
import { cn } from '@/lib/utils';
import { shortName } from '@/utils/short-name';
import { BarChart3, LogOut, MessageSquare, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/' },
  { icon: Ticket, label: 'Tickets', href: '/tickets' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
];

export function Sidebar() {
  const [userName, setUserName] = useState<string | null>(null);
  const pathname = usePathname();

  const { getItem } = useLocalStorage();

  useEffect(() => {
    const name = getItem('user_name') || 'Usuário';
    setUserName(shortName(name));
  }, [getItem]);

  const { logout } = useLogout();

  return (
    <aside
      className="
        fixed top-0 left-0 h-full w-24
        bg-sidebar border-r border-sidebar-border
        rounded-r-4xl 
        flex flex-col items-center justify-between py-16 z-40
      "
    >
      {/* Logo e Navegação */}
      <div className="flex flex-col items-center gap-6">
        <Image src="/img/logo.png" alt="Logo Nortus" width={32} height={32} priority />

        <nav className="flex flex-col gap-4 mt-6">
          {navItems.map(({ icon: Icon, href }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={i}
                href={href}
                className={cn(
                  'p-3 rounded-xl transition-all flex items-center justify-center',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-(--shadow-accent) scale-105'
                    : 'text-muted-foreground hover:bg-accent/20 hover:text-accent hover:scale-105',
                )}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Avatar do usuário com dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer
              w-10 h-10 
              rounded-full 
              font-semibold 
              shadow-(--shadow-accent) 
              hover:opacity-90 
              transition-all
            "
            aria-label="Abrir menu do usuário"
          >
            {userName}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          align="start"
          className="w-48 bg-secondary text-foreground border border-border rounded-xl shadow-lg"
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground px-2">
            Menu de Ações
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border/50" />
          <DropdownMenuItem
            onClick={logout}
            className="flex items-center gap-2 text-rose-400 hover:text-rose-300 cursor-pointer"
          >
            <LogOut size={14} />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
}
