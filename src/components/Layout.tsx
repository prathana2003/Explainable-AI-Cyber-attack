import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DemoBadge, PrototypeBadge } from '@/components/Badge';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  showBadges?: boolean;
};

export function PageHeader({ title, subtitle, showBadges = true }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        {showBadges && (
          <div className="flex gap-2">
            <PrototypeBadge />
            <DemoBadge />
          </div>
        )}
      </div>
      {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar - fixed on desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Status: <span className="text-emerald-400 font-medium">Operational</span></span>
            <span className="mx-2 text-slate-700">|</span>
            <span>Demo Mode</span>
          </div>
          <div className="text-xs text-slate-500">
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
