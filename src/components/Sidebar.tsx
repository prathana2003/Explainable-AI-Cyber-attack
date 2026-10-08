import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSearch,
  TableProperties,
  Gauge,
  Sparkles,
  ShieldAlert,
  Info,
  Shield,
} from 'lucide-react';
import { PrototypeBadge } from './Badge';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/single-analysis', label: 'Single Traffic Analysis', icon: FileSearch },
  { to: '/batch-analysis', label: 'Batch Analysis', icon: TableProperties },
  { to: '/model-performance', label: 'Model Performance', icon: Gauge },
  { to: '/explainability', label: 'Explainability', icon: Sparkles },
  { to: '/risk-assessment', label: 'Risk Assessment', icon: ShieldAlert },
  { to: '/about', label: 'About / Methodology', icon: Info },
];

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950">
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <Shield className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-100 leading-tight">XAI Cyber</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Detection & Risk</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          Navigation
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-800 px-5 py-4">
        <PrototypeBadge />
        <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
          Simulated values for visualization. Not live intrusion detection.
        </p>
      </div>
    </aside>
  );
}
