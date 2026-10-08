import {
  Database,
  Brain,
  Sparkles,
  ShieldAlert,
  LayoutDashboard,
  ArrowDown,
  Code2,
  AlertCircle,
  Target,
  Filter,
  Cpu,
} from 'lucide-react';
import { PageHeader } from '@/components/Layout';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';

const pipelineSteps = [
  { label: 'UNSW-NB15', icon: Database },
  { label: 'Data Preprocessing', icon: Filter },
  { label: 'Random Forest / XGBoost / DNN', icon: Brain },
  { label: 'Attack Classification', icon: Cpu },
  { label: 'SHAP + LIME', icon: Sparkles },
  { label: 'Risk Assessment', icon: ShieldAlert },
  { label: 'Dashboard', icon: LayoutDashboard },
];

const sections = [
  {
    icon: Target,
    title: 'Research Objective',
    body: 'To develop an explainable AI-based network intrusion detection system that not only classifies network traffic as normal or malicious but also provides human-interpretable explanations for each prediction and quantifies the associated risk level.',
  },
  {
    icon: Database,
    title: 'Dataset',
    body: 'The UNSW-NB15 dataset is a comprehensive network traffic dataset created by the Cyber Range Lab of the Australian Centre for Cyber Security. It contains 2,540,044 records with 49 features and 9 attack categories: Analysis, Backdoor, DoS, Exploits, Fuzzers, Generic, Reconnaissance, Shellcode, and Worms.',
  },
  {
    icon: Brain,
    title: 'Machine Learning Models',
    body: 'Three classifier architectures were evaluated: Random Forest (ensemble of decision trees), XGBoost (gradient-boosted trees), and Deep Neural Network (multi-layer perceptron). Each model was trained on preprocessed network features to classify traffic into attack categories.',
  },
  {
    icon: Sparkles,
    title: 'Explainable AI',
    body: 'SHAP (SHapley Additive exPlanations) provides global feature importance based on cooperative game theory. LIME (Local Interpretable Model-agnostic Explanations) generates local surrogate models to explain individual predictions. Together they bridge the gap between model accuracy and interpretability.',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Assessment',
    body: 'A prototype risk scoring mechanism combines prediction confidence, attack severity, feature contribution, and asset criticality into a composite score from 0–100, mapped to four risk levels: Low, Medium, High, and Critical.',
  },
  {
    icon: Code2,
    title: 'Technology Stack',
    body: 'React + TypeScript for the frontend, Tailwind CSS for styling, Recharts for data visualization, and a component-based architecture for maintainability. The dashboard runs entirely in the browser with simulated demo data.',
  },
  {
    icon: AlertCircle,
    title: 'Limitations',
    body: 'This interface is a research prototype. The current online demonstration uses simulated values for visualization and does not claim to perform live network intrusion detection. Real deployment would require model training, a streaming data pipeline, and server-side inference.',
  },
];

export default function About() {
  return (
    <div>
      <PageHeader
        title="About / Methodology"
        subtitle="Research architecture, methodology, and limitations of the explainable AI cyber attack detection system."
      />

      {/* Pipeline */}
      <Card title="Research Architecture" subtitle="End-to-end pipeline from dataset to dashboard" className="mb-6">
        <div className="flex flex-col items-center gap-2 p-8 lg:flex-row lg:justify-center lg:gap-0 lg:flex-wrap">
          {pipelineSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center lg:flex-row">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-4 w-44">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <step.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <p className="text-center text-xs font-medium text-slate-200">{step.label}</p>
              </div>
              {i < pipelineSteps.length - 1 && (
                <ArrowDown className="my-1 h-4 w-4 text-slate-600 lg:mx-2 lg:rotate-[-90deg]" />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <section.icon className="h-4 w-4 text-cyan-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-100">{section.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{section.body}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="mt-6">
        <div className="flex items-start gap-3 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <p className="text-sm text-slate-300">
              This interface is a research prototype. The current online demonstration uses simulated values for
              visualization and does not claim to perform live network intrusion detection.
            </p>
            <div className="mt-3 flex gap-2">
              <Badge variant="prototype">RESEARCH PROTOTYPE</Badge>
              <Badge variant="demo">DEMO DATA</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
