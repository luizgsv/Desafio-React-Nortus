'use client';

export function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-10
        h-20 border-b border-sidebar-border bg-secondary/90 
        backdrop-blur-md flex items-center justify-between px-40
      "
    >
      <h1 className="text-lg font-semibold text-primary">Dashboard</h1>
    </header>
  );
}
