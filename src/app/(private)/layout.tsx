import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen max-w-screen bg-background text-foreground overflow-hidden">
      <Header />

      <Sidebar />

      <main className="pt-24 pl-24 flex justify-center">
        <div className="w-full max-w-7xl p-6">{children}</div>
      </main>
    </div>
  );
}
