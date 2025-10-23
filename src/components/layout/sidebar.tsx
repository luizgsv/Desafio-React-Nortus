'use client';

import { useLocalStorage } from '@/hooks/local-storage';
import { cn } from '@/lib/utils';
import { shortName } from '@/utils/short-name';
import { BarChart3, MessageSquare, Ticket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  }, []);

  return (
    <aside
      className="
        fixed top-0 left-0 h-full w-24
        bg-sidebar border-r border-sidebar-border
        rounded-r-4xl 
        flex flex-col items-center justify-between py-16 z-40
      "
    >
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
                    ? 'bg-accent text-accent-foreground shadow-[var(--shadow-accent)] scale-105'
                    : 'text-muted-foreground hover:bg-accent/20 hover:text-accent hover:scale-105',
                )}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold shadow-[var(--shadow-accent)]">
        {userName}
      </div>
    </aside>
  );
}
