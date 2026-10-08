import { useState, useRef } from 'react';
import { Upload, Database, Download, TableProperties } from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { BATCH_ROWS } from '@/data/demoData';
import { RISK_COLORS } from '@/data/colors';

export default function BatchAnalysis() {
  const [rows, setRows] = useState<typeof BATCH_ROWS | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadDemo = () => setRows(BATCH_ROWS);

  const downloadCSV = () => {
    if (!rows) return;
    const headers = ['Record ID', 'Protocol', 'Duration', 'Prediction', 'Confidence', 'Risk Score', 'Risk Level', 'Top Feature'];
    const csvLines = [
      headers.join(','),
      ...rows.map((r) => [r.id, r.protocol, r.duration, r.prediction, r.confidence, r.riskScore, r.riskLevel, r.topFeature].join(',')),
    ];
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch_analysis_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileClick = () => fileInputRef.current?.click();

  return (
    <div>
      <PageHeader
        title="Batch Analysis"
        subtitle="Upload a CSV of network traffic records for bulk classification and risk assessment."
      />

      {/* Upload Area */}
      <Card className="mb-6">
        <div className="p-6">
          <div
            onClick={handleFileClick}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/50 py-12 transition-colors hover:border-cyan-500/40 hover:bg-slate-900/50"
          >
            <Upload className="h-10 w-10 text-slate-600" />
            <p className="mt-3 text-sm text-slate-400">Click to select a CSV file</p>
            <p className="mt-1 text-xs text-slate-600">No file is actually uploaded — this is a demo interface</p>
            <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={loadDemo} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={loadDemo}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              <Database className="h-4 w-4" />
              Load Demo Batch
            </button>
            {rows && (
              <button
                onClick={downloadCSV}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
              >
                <Download className="h-4 w-4" />
                Download Results
              </button>
            )}
            <Badge variant="demo">Demo batch analysis — simulated results</Badge>
          </div>
        </div>
      </Card>

      {/* Results Table */}
      {rows ? (
        <Card
          title="Batch Results"
          subtitle={`${rows.length} records analyzed`}
          action={<TableProperties className="h-5 w-5 text-slate-600" />}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 text-left font-medium">Record ID</th>
                  <th className="px-5 py-3 text-left font-medium">Protocol</th>
                  <th className="px-5 py-3 text-left font-medium">Duration</th>
                  <th className="px-5 py-3 text-left font-medium">Prediction</th>
                  <th className="px-5 py-3 text-left font-medium">Confidence</th>
                  <th className="px-5 py-3 text-left font-medium">Risk Score</th>
                  <th className="px-5 py-3 text-left font-medium">Risk Level</th>
                  <th className="px-5 py-3 text-left font-medium">Top Feature</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800/50 transition-colors hover:bg-slate-800/30">
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-400">{row.id}</td>
                    <td className="px-5 py-3.5 text-slate-300">{row.protocol}</td>
                    <td className="px-5 py-3.5 text-slate-300">{row.duration}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-200">{row.prediction}</td>
                    <td className="px-5 py-3.5 text-slate-300">{row.confidence}</td>
                    <td className="px-5 py-3.5 font-semibold tabular-nums text-slate-200">{row.riskScore}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{
                          backgroundColor: `${RISK_COLORS[row.riskLevel]}20`,
                          color: RISK_COLORS[row.riskLevel],
                        }}
                      >
                        {row.riskLevel}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">{row.topFeature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <TableProperties className="h-12 w-12 text-slate-700" />
            <p className="mt-4 text-sm text-slate-500">
              Click "Load Demo Batch" to view simulated batch analysis results.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
