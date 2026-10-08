import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';
import {
  Activity,
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  Skull,
  Network,
  Brain,
  Sparkles,
  ShieldAlert,
  LayoutDashboard,
  ArrowDown,
} from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card, StatCard } from '@/components/Card';
import { DemoBadge } from '@/components/Badge';
import {
  OVERVIEW_METRICS,
  ATTACK_DISTRIBUTION,
  RISK_DISTRIBUTION,
  CONFIDENCE_DISTRIBUTION,
} from '@/data/demoData';
import { ATTACK_COLORS, RISK_COLORS, CHART_COLORS } from '@/data/colors';

const metricIcons = [Activity, ShieldCheck, AlertOctagon, AlertTriangle, Skull];
const metricAccents = ['blue', 'emerald', 'rose', 'amber', 'red'] as const;

const workflowSteps = [
  { label: 'Network Traffic', icon: Network },
  { label: 'ML Classification', icon: Brain },
  { label: 'SHAP + LIME Explanation', icon: Sparkles },
  { label: 'Risk Assessment', icon: ShieldAlert },
  { label: 'Security Dashboard', icon: LayoutDashboard },
];

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#e2e8f0',
};

export default function Overview() {
  return (
    <div>
      <PageHeader
        title="Explainable AI Cyber Attack Detection & Risk Assessment"
        subtitle="AI-powered network traffic analysis with explainable predictions and risk assessment."
      />

      {/* Metric Cards */}
      <div className="mb-6 flex items-center gap-3">
        <DemoBadge />
        <span className="text-xs text-slate-500">Dataset: 10,000 simulated network events</span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {OVERVIEW_METRICS.map((m, i) => {
          const Icon = metricIcons[i];
          return (
            <StatCard
              key={m.label}
              label={m.label}
              value={m.value.toLocaleString()}
              accent={metricAccents[i]}
              icon={<Icon className="h-5 w-5" />}
            />
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Attack Type Distribution" subtitle="Classified network events by attack category" className="lg:col-span-1">
          <div className="p-4" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ATTACK_DISTRIBUTION}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={110}
                  paddingAngle={2}
                >
                  {ATTACK_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={ATTACK_COLORS[entry.name] || CHART_COLORS.slate} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {ATTACK_DISTRIBUTION.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ATTACK_COLORS[entry.name] }} />
                {entry.name}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Risk Level Distribution" subtitle="Events grouped by risk severity" className="lg:col-span-1">
          <div className="p-4" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_DISTRIBUTION} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} width={70} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {RISK_DISTRIBUTION.map((entry) => (
                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Confidence Distribution" subtitle="Model prediction confidence across events" className="lg:col-span-1">
          <div className="p-4" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CONFIDENCE_DISTRIBUTION} margin={{ left: 0, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.cyan} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={CHART_COLORS.cyan} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_COLORS.cyan}
                  strokeWidth={2}
                  fill="url(#confGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Workflow */}
      <Card title="Detection Workflow" subtitle="End-to-end pipeline from raw traffic to dashboard" className="mt-6">
        <div className="flex flex-col items-center gap-2 p-8 lg:flex-row lg:justify-center lg:gap-0">
          {workflowSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center lg:flex-row">
              <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-5 w-48">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <step.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <p className="text-center text-sm font-medium text-slate-200">{step.label}</p>
              </div>
              {i < workflowSteps.length - 1 && (
                <ArrowDown className="my-1 h-5 w-5 text-slate-600 lg:mx-3 lg:rotate-[-90deg]" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
