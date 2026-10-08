import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { ShieldAlert } from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { RISK_BREAKDOWN, RISK_THRESHOLDS } from '@/data/demoData';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#e2e8f0',
};

const RISK_SCORE = 42.4;
const RISK_LEVEL = 'MEDIUM';
const RISK_COLOR = '#f59e0b';

export default function RiskAssessment() {
  const gaugeData = [{ name: 'Risk', value: RISK_SCORE, fill: RISK_COLOR }];

  return (
    <div>
      <PageHeader
        title="Risk Assessment"
        subtitle="Prototype risk scoring mechanism combining prediction confidence, attack severity, and asset criticality."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Risk Gauge */}
        <Card title="Risk Score" subtitle="Composite risk assessment" className="lg:col-span-1">
          <div className="flex flex-col items-center p-6">
            <div className="relative" style={{ width: 220, height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={gaugeData} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: '#1e293b' }} dataKey="value" cornerRadius={12} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-bold text-slate-100 tabular-nums">{RISK_SCORE}</p>
                <p className="text-sm text-slate-500">/ 100</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-wider" style={{ color: RISK_COLOR }}>
                  {RISK_LEVEL}
                </p>
              </div>
            </div>

            {/* Threshold Legend */}
            <div className="mt-6 w-full space-y-2">
              {RISK_THRESHOLDS.map((t) => (
                <div key={t.range} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-xs text-slate-400 tabular-nums">{t.range}</span>
                  <span className="ml-auto text-xs font-semibold" style={{ color: t.color }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Breakdown */}
        <Card title="Risk Breakdown" subtitle="Weighted contribution of each risk factor" className="lg:col-span-2">
          <div className="space-y-5 p-6">
            {RISK_BREAKDOWN.map((factor) => (
              <div key={factor.label}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{factor.label}</p>
                    <p className="text-[10px] text-slate-500">Weight: {factor.weight}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums" style={{ color: factor.color }}>
                      +{factor.contribution.toFixed(1)}
                    </p>
                    <p className="text-[10px] text-slate-500">Raw: {factor.value.toFixed(1)}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${factor.value}%`, backgroundColor: factor.color }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-200">Composite Risk Score</p>
                <p className="text-2xl font-bold tabular-nums" style={{ color: RISK_COLOR }}>
                  {RISK_SCORE} / 100
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Contribution Chart */}
      <Card title="Risk Factor Contributions" subtitle="Visual comparison of each factor's weighted contribution" className="mt-6">
        <div className="p-4" style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RISK_BREAKDOWN} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tick={{ angle: -15, textAnchor: 'end' }} height={60} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
              <Bar dataKey="contribution" radius={[4, 4, 0, 0]}>
                {RISK_BREAKDOWN.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Disclaimer */}
      <Card className="mt-6">
        <div className="flex items-start gap-3 p-5">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm text-slate-300">
              Risk scoring is a project-proposed prototype mechanism and is not an industry-standard risk formula.
            </p>
            <div className="mt-2">
              <Badge variant="demo">Prototype Mechanism</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
