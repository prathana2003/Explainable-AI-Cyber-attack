import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { Gauge } from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import {
  MODEL_METRICS,
  MODEL_BAR_DATA,
  CONFUSION_MATRIX,
  PER_CLASS_PERFORMANCE,
} from '@/data/demoData';
import { CHART_COLORS, MODEL_COLORS } from '@/data/colors';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#e2e8f0',
};

function getMaxValue(matrix: number[][]): number {
  return Math.max(...matrix.flat());
}

export default function ModelPerformance() {
  const maxVal = getMaxValue(CONFUSION_MATRIX.matrix);

  function colorForValue(val: number, max: number): string {
    const ratio = val / max;
    if (ratio === 0) return '#0f172a';
    // cyan intensity scale
    const alpha = Math.round(40 + ratio * 215);
    return `rgba(6, 182, 212, ${alpha / 255})`;
  }

  return (
    <div>
      <PageHeader
        title="Model Performance"
        subtitle="Comparison of Random Forest, XGBoost, and DNN classifiers on network attack detection."
      />

      <div className="mb-4 flex items-center gap-3">
        <Badge variant="demo">Illustrative / Demo Metrics — Not Experimental Results</Badge>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {MODEL_METRICS.map((m) => (
          <Card key={m.model}>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-100">{m.model}</h3>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${MODEL_COLORS[m.model]}20` }}
                >
                  <Gauge className="h-4 w-4" style={{ color: MODEL_COLORS[m.model] }} />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Accuracy', value: m.accuracy },
                  { label: 'Precision', value: m.precision },
                  { label: 'Recall', value: m.recall },
                  { label: 'F1 Score', value: m.f1 },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-lg bg-slate-800/50 p-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">{metric.label}</p>
                    <p className="mt-1 text-lg font-bold tabular-nums" style={{ color: MODEL_COLORS[m.model] }}>
                      {metric.value}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Comparison Bar Chart */}
      <Card title="Model Comparison" subtitle="Side-by-side metric comparison across models" className="mt-6">
        <div className="p-4" style={{ height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MODEL_BAR_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="metric" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={11} domain={[85, 100]} unit="%" />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Random Forest" fill={MODEL_COLORS['Random Forest']} radius={[4, 4, 0, 0]} />
              <Bar dataKey="XGBoost" fill={MODEL_COLORS.XGBoost} radius={[4, 4, 0, 0]} />
              <Bar dataKey="DNN" fill={MODEL_COLORS.DNN} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Confusion Matrix */}
        <Card title="Confusion Matrix" subtitle="XGBoost — predicted vs actual class (demo values)">
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="mx-auto">
                <thead>
                  <tr>
                    <th className="p-2 text-xs text-slate-600">
                      <span className="block text-slate-500">Actual ↓</span>
                      <span className="block text-slate-500">Pred →</span>
                    </th>
                    {CONFUSION_MATRIX.labels.map((label) => (
                      <th key={label} className="p-2 text-[10px] font-medium text-slate-400">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONFUSION_MATRIX.matrix.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 text-right text-[10px] font-medium text-slate-400">
                        {CONFUSION_MATRIX.labels[i]}
                      </td>
                      {row.map((val, j) => (
                        <td key={j} className="p-1">
                          <div
                            className="flex h-14 w-16 items-center justify-center rounded text-xs font-semibold tabular-nums"
                            style={{
                              backgroundColor: colorForValue(val, maxVal),
                              color: val / maxVal > 0.4 ? '#0f172a' : '#94a3b8',
                            }}
                          >
                            {val}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Per-Class Performance */}
        <Card title="Per-Class Performance" subtitle="Precision, Recall, and F1 by attack class (XGBoost)">
          <div className="p-4" style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PER_CLASS_PERFORMANCE} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="class" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[85, 100]} unit="%" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="precision" stroke={CHART_COLORS.cyan} strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="recall" stroke={CHART_COLORS.emerald} strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="f1" stroke={CHART_COLORS.amber} strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
