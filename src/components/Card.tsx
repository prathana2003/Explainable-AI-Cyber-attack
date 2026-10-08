import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
};

export function Card({ children, className = '', title, subtitle, action }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-lg shadow-black/20 ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-100">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string | number;
  accent?: 'cyan' | 'emerald' | 'rose' | 'amber' | 'red' | 'blue' | 'violet';
  icon?: ReactNode;
};

const accentMap = {
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
  emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
  rose: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
  amber: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  red: 'text-red-400 border-red-500/30 bg-red-500/5',
  blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
  violet: 'text-violet-400 border-violet-500/30 bg-violet-500/5',
};

export function StatCard({ label, value, accent = 'cyan', icon }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${accentMap[accent]}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
        {icon && <div className="opacity-70">{icon}</div>}
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
