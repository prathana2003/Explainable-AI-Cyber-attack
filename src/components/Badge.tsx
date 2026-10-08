import type { ReactNode } from 'react';
import { AlertTriangle, FlaskConical } from 'lucide-react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'prototype' | 'demo' | 'neutral';
  className?: string;
};

const styles = {
  prototype: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  demo: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  neutral: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${styles[variant]} ${className}`}
    >
      {variant === 'prototype' && <FlaskConical className="h-3 w-3" />}
      {variant === 'demo' && <AlertTriangle className="h-3 w-3" />}
      {children}
    </span>
  );
}

export function PrototypeBadge() {
  return (
    <Badge variant="prototype">RESEARCH PROTOTYPE</Badge>
  );
}

export function DemoBadge() {
  return (
    <Badge variant="demo">DEMO DATA</Badge>
  );
}
