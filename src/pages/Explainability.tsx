import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Sparkles, GitCompare, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import {
  SHAP_GLOBAL_IMPORTANCE,
  SHAP_CONTRIBUTIONS,
  LIME_LOCAL_CONTRIBUTIONS,
} from '@/data/demoData';
import { CHART_COLORS } from '@/data/colors';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#e2e8f0',
};

export default function Explainability() {
  return (
    <div>
      <PageHeader
        title="Explainability"
        subtitle="Understanding model decisions through SHAP and LIME explainability techniques."
      />

      {/* SHAP Section */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">SHAP</h3>
            <p className="text-sm text-slate-400">SHAP explains how individual features contribute to a model prediction.</p>
          </div>
          <Badge variant="demo" className="ml-auto">Simulated Values</Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="Global Feature Importance" subtitle="Mean absolute SHAP value across all predictions">
            <div className="p-4" style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SHAP_GLOBAL_IMPORTANCE} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis type="category" dataKey="feature" stroke="#94a3b8" fontSize={11} width={120} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {SHAP_GLOBAL_IMPORTANCE.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS.cyan} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Positive / Negative Contributions" subtitle="Direction of SHAP impact for a single prediction">
            <div className="p-5 space-y-3">
              {SHAP_CONTRIBUTIONS.map((c) => (
                <div key={c.feature}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{c.feature}</span>
                    <div className="flex gap-3">
                      {c.positive > 0 && <span className="font-semibold text-emerald-400">+{c.positive.toFixed(2)}</span>}
                      {c.negative < 0 && <span className="font-semibold text-rose-400">{c.negative.toFixed(2)}</span>}
                    </div>
                  </div>
                  <div className="mt-1.5 flex h-2 gap-0.5">
                    <div className="flex-1 rounded-l-full bg-slate-800">
                      {c.negative < 0 && (
                        <div className="ml-auto h-full rounded-l-full bg-rose-500" style={{ width: `${(Math.abs(c.negative) / 0.4) * 100}%` }} />
                      )}
                    </div>
                    <div className="flex-1 rounded-r-full bg-slate-800">
                      {c.positive > 0 && (
                        <div className="h-full rounded-r-full bg-emerald-500" style={{ width: `${(c.positive / 0.4) * 100}%` }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-2 text-[10px] text-slate-500">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Positive</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Negative</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* LIME Section */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
            <GitCompare className="h-4 w-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">LIME</h3>
            <p className="text-sm text-slate-400">LIME provides a local explanation for an individual prediction.</p>
          </div>
          <Badge variant="demo" className="ml-auto">Simulated Values</Badge>
        </div>

        <Card title="Local Feature Contribution" subtitle="LIME weights for a single prediction instance">
          <div className="p-4" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LIME_LOCAL_CONTRIBUTIONS} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} domain={[-0.1, 0.3]} />
                <YAxis type="category" dataKey="feature" stroke="#94a3b8" fontSize={11} width={120} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {LIME_LOCAL_CONTRIBUTIONS.map((entry, i) => (
                    <Cell key={i} fill={entry.value >= 0 ? CHART_COLORS.violet : CHART_COLORS.rose} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Global vs Local Comparison */}
      <Card title="Global Explanation vs Local Explanation" subtitle="Understanding the difference between global and local interpretability">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          <div className="border-b border-slate-800 p-6 md:border-b-0 md:border-r">
            <h4 className="text-sm font-semibold text-cyan-400">Global Explanation (SHAP)</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" /> Explains model behavior across the entire dataset</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" /> Identifies which features matter most overall</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" /> Based on game-theoretic Shapley values</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" /> Provides consistent and locally accurate attributions</li>
            </ul>
          </div>
          <div className="p-6">
            <h4 className="text-sm font-semibold text-violet-400">Local Explanation (LIME)</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" /> Explains a single prediction instance</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" /> Generates perturbed samples around the instance</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" /> Fits a simple local surrogate model</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" /> Shows which features drove this specific decision</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 border-t border-slate-800 p-4 text-xs text-slate-500">
          <span className="font-medium text-cyan-400">Global</span>
          <ArrowRight className="h-4 w-4 text-slate-600" />
          <span>Complementary Approaches</span>
          <ArrowRight className="h-4 w-4 text-slate-600" />
          <span className="font-medium text-violet-400">Local</span>
        </div>
      </Card>
    </div>
  );
}
