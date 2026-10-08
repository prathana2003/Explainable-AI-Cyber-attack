import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';
import { FileSearch, Zap, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { SAMPLE_TRAFFIC, SINGLE_RESULT } from '@/data/demoData';
import { CHART_COLORS, ATTACK_COLORS, RISK_COLORS } from '@/data/colors';

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #1e293b',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#e2e8f0',
};

type FieldKey = keyof typeof SAMPLE_TRAFFIC;

const fieldGroups: { title: string; fields: { key: FieldKey; label: string }[] }[] = [
  {
    title: 'Basic Traffic',
    fields: [
      { key: 'protocol', label: 'Protocol' },
      { key: 'duration', label: 'Duration' },
      { key: 'sourceBytes', label: 'Source Bytes' },
      { key: 'destinationBytes', label: 'Destination Bytes' },
    ],
  },
  {
    title: 'Packet Information',
    fields: [
      { key: 'sourcePackets', label: 'Source Packets' },
      { key: 'destinationPackets', label: 'Destination Packets' },
      { key: 'sourceLoad', label: 'Source Load' },
      { key: 'destinationLoad', label: 'Destination Load' },
    ],
  },
  {
    title: 'Connection Information',
    fields: [
      { key: 'sourceIP', label: 'Source IP' },
      { key: 'destinationIP', label: 'Destination IP' },
      { key: 'service', label: 'Service' },
      { key: 'state', label: 'State' },
    ],
  },
];

export default function SingleAnalysis() {
  const [traffic, setTraffic] = useState<Record<FieldKey, string>>({
    protocol: '',
    duration: '',
    sourceBytes: '',
    destinationBytes: '',
    sourcePackets: '',
    destinationPackets: '',
    sourceLoad: '',
    destinationLoad: '',
    sourceIP: '',
    destinationIP: '',
    service: '',
    state: '',
  });
  const [analyzed, setAnalyzed] = useState(false);

  const loadSample = () => {
    setTraffic({ ...SAMPLE_TRAFFIC });
    setAnalyzed(false);
  };

  const analyze = () => {
    setAnalyzed(true);
  };

  const riskGaugeData = [{ name: 'Risk', value: SINGLE_RESULT.riskScore, fill: RISK_COLORS[SINGLE_RESULT.riskLevel] }];

  return (
    <div>
      <PageHeader
        title="Single Traffic Analysis"
        subtitle="Analyze an individual network flow with AI prediction, explainability, and risk scoring."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Input Panel */}
        <div className="space-y-4">
          {fieldGroups.map((group) => (
            <Card key={group.title} title={group.title}>
              <div className="grid grid-cols-2 gap-4 p-5">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">{field.label}</label>
                    <input
                      type="text"
                      value={traffic[field.key]}
                      onChange={(e) => setTraffic({ ...traffic, [field.key]: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
                      placeholder="—"
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <div className="flex gap-3">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
            >
              <FileSearch className="h-4 w-4" />
              Load Sample Traffic
            </button>
            <button
              onClick={analyze}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              <Zap className="h-4 w-4" />
              Analyze Traffic
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {!analyzed ? (
            <Card>
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <FileSearch className="h-12 w-12 text-slate-700" />
                <p className="mt-4 text-sm text-slate-500">
                  Load sample traffic and click "Analyze Traffic" to view prediction results.
                </p>
              </div>
            </Card>
          ) : (
            <>
              {/* Prediction Card */}
              <Card>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">Predicted Attack</p>
                      <p className="mt-1 text-3xl font-bold" style={{ color: ATTACK_COLORS[SINGLE_RESULT.predictedAttack] || CHART_COLORS.cyan }}>
                        {SINGLE_RESULT.predictedAttack}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-500">Risk Level</p>
                      <p className="mt-1 text-2xl font-bold" style={{ color: RISK_COLORS[SINGLE_RESULT.riskLevel] }}>
                        {SINGLE_RESULT.riskLevel}
                      </p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Confidence</span>
                      <span className="font-semibold text-cyan-400">{SINGLE_RESULT.confidence}%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                        style={{ width: `${SINGLE_RESULT.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Risk Score Gauge */}
                  <div className="mt-5 flex items-center gap-4">
                    <div style={{ width: 140, height: 140 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart innerRadius="70%" outerRadius="100%" data={riskGaugeData} startAngle={90} endAngle={-270}>
                          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                          <RadialBar background={{ fill: '#1e293b' }} dataKey="value" cornerRadius={8} />
                        </RadialBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">Risk Score</p>
                      <p className="text-3xl font-bold text-slate-100">
                        {SINGLE_RESULT.riskScore}
                        <span className="text-base text-slate-500"> / 100</span>
                      </p>
                      <p className="mt-1 text-sm" style={{ color: RISK_COLORS[SINGLE_RESULT.riskLevel] }}>
                        {SINGLE_RESULT.riskLevel} Risk
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Class Probability Chart */}
              <Card title="Class Probability Distribution" subtitle="Model output probabilities per attack class">
                <div className="p-4" style={{ height: 240 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SINGLE_RESULT.classProbabilities} layout="vertical" margin={{ left: 20, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 100]} unit="%" />
                      <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} width={100} />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#1e293b40' }} />
                      <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                        {SINGLE_RESULT.classProbabilities.map((entry) => (
                          <Cell key={entry.name} fill={ATTACK_COLORS[entry.name] || CHART_COLORS.slate} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* SHAP Values */}
              <Card
                title="Top Contributing Features — SHAP"
                subtitle="Feature attribution for this prediction"
                action={<Badge variant="demo">Simulated</Badge>}
              >
                <div className="space-y-3 p-5">
                  {SINGLE_RESULT.shapValues.map((s) => (
                    <div key={s.feature}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300">{s.feature}</span>
                        <span className="font-semibold text-cyan-400">+{s.value.toFixed(2)}</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-cyan-500"
                          style={{ width: `${(s.value / 0.4) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* LIME Values */}
              <Card
                title="Local Explanation — LIME"
                subtitle="Local feature contributions for this instance"
                action={<Badge variant="demo">Simulated</Badge>}
              >
                <div className="p-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs text-slate-500">
                        <th className="pb-2 text-left font-medium">Feature</th>
                        <th className="pb-2 text-right font-medium">Contribution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SINGLE_RESULT.limeValues.map((l) => (
                        <tr key={l.feature} className="border-b border-slate-800/50">
                          <td className="py-2.5 text-slate-300">{l.feature}</td>
                          <td className={`py-2.5 text-right font-semibold ${l.value >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {l.value >= 0 ? '+' : ''}{l.value.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Explanation */}
              <Card>
                <div className="flex items-start gap-3 p-5">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                  <div>
                    <p className="text-sm text-slate-300">{SINGLE_RESULT.explanation}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      SHAP/LIME values shown are simulated demonstration values.
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
