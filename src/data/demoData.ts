// ============================================================
// DEMO / SIMULATED DATA FOR RESEARCH PROTOTYPE
// All values below are fabricated for visualization purposes.
// ============================================================

export const ATTACK_CATEGORIES = [
  'Normal',
  'Analysis',
  'Backdoor',
  'DoS',
  'Exploits',
  'Fuzzers',
  'Generic',
  'Reconnaissance',
  'Shellcode',
  'Worms',
] as const;

export type AttackCategory = (typeof ATTACK_CATEGORIES)[number];

export const OVERVIEW_METRICS = [
  { label: 'Total Events', value: 10000, accent: 'cyan' },
  { label: 'Normal Events', value: 6200, accent: 'emerald' },
  { label: 'Attack Events', value: 3800, accent: 'rose' },
  { label: 'High Risk', value: 1240, accent: 'amber' },
  { label: 'Critical Risk', value: 580, accent: 'red' },
] as const;

export const ATTACK_DISTRIBUTION = [
  { name: 'Normal', value: 6200 },
  { name: 'Analysis', value: 520 },
  { name: 'Backdoor', value: 430 },
  { name: 'DoS', value: 1220 },
  { name: 'Exploits', value: 890 },
  { name: 'Fuzzers', value: 380 },
  { name: 'Generic', value: 660 },
  { name: 'Reconnaissance', value: 540 },
  { name: 'Shellcode', value: 290 },
  { name: 'Worms', value: 220 },
];

export const RISK_DISTRIBUTION = [
  { name: 'Low', value: 6200, color: '#10b981' },
  { name: 'Medium', value: 1980, color: '#f59e0b' },
  { name: 'High', value: 1240, color: '#f97316' },
  { name: 'Critical', value: 580, color: '#ef4444' },
];

export const CONFIDENCE_DISTRIBUTION = [
  { range: '0-20%', value: 120 },
  { range: '20-40%', value: 280 },
  { range: '40-60%', value: 640 },
  { range: '60-80%', value: 2100 },
  { range: '80-100%', value: 6860 },
];

// ---- Workflow ----
export const WORKFLOW_STEPS = [
  { label: 'Network Traffic', icon: 'Network' },
  { label: 'ML Classification', icon: 'Brain' },
  { label: 'SHAP + LIME Explanation', icon: 'Sparkles' },
  { label: 'Risk Assessment', icon: 'ShieldAlert' },
  { label: 'Security Dashboard', icon: 'LayoutDashboard' },
];

// ---- Single Traffic Analysis ----
export const SAMPLE_TRAFFIC = {
  protocol: 'TCP',
  duration: '12.0',
  sourceBytes: '1846',
  destinationBytes: '1124',
  sourcePackets: '24',
  destinationPackets: '18',
  sourceLoad: '0.12',
  destinationLoad: '0.08',
  sourceIP: '192.168.1.105',
  destinationIP: '10.0.0.24',
  service: 'http',
  state: 'FIN',
};

export const SINGLE_RESULT = {
  predictedAttack: 'Analysis',
  confidence: 81.9,
  riskScore: 42.4,
  riskLevel: 'MEDIUM',
  classProbabilities: [
    { name: 'Analysis', probability: 81.9 },
    { name: 'Normal', probability: 8.2 },
    { name: 'Reconnaissance', probability: 4.1 },
    { name: 'DoS', probability: 2.8 },
    { name: 'Exploits', probability: 1.5 },
    { name: 'Other', probability: 1.5 },
  ],
  shapValues: [
    { feature: 'Source Bytes', value: 0.31 },
    { feature: 'Destination Bytes', value: 0.24 },
    { feature: 'Duration', value: 0.18 },
    { feature: 'Packet Rate', value: 0.12 },
    { feature: 'Service', value: 0.08 },
  ],
  limeValues: [
    { feature: 'Source Bytes', value: 0.21 },
    { feature: 'Duration', value: 0.14 },
    { feature: 'Destination Bytes', value: 0.11 },
    { feature: 'Packet Count', value: 0.09 },
  ],
  explanation:
    'The traffic was classified as Analysis because several network-flow characteristics contributed positively to the prediction.',
};

// ---- Batch Analysis ----
export const BATCH_ROWS = [
  { id: 'TR-001', protocol: 'TCP', duration: '12.0', prediction: 'Analysis', confidence: '81.9%', riskScore: '42.4', riskLevel: 'Medium', topFeature: 'Source Bytes' },
  { id: 'TR-002', protocol: 'TCP', duration: '4.2', prediction: 'DoS', confidence: '94.2%', riskScore: '78.6', riskLevel: 'Critical', topFeature: 'Packet Rate' },
  { id: 'TR-003', protocol: 'UDP', duration: '2.8', prediction: 'Normal', confidence: '96.1%', riskScore: '12.4', riskLevel: 'Low', topFeature: 'Duration' },
  { id: 'TR-004', protocol: 'TCP', duration: '8.5', prediction: 'Exploits', confidence: '88.7%', riskScore: '72.1', riskLevel: 'High', topFeature: 'Destination Bytes' },
  { id: 'TR-005', protocol: 'TCP', duration: '15.1', prediction: 'Reconnaissance', confidence: '90.3%', riskScore: '65.8', riskLevel: 'High', topFeature: 'Connection Count' },
];

// ---- Model Performance ----
export const MODEL_METRICS = [
  { model: 'Random Forest', accuracy: 94.2, precision: 93.8, recall: 92.9, f1: 93.3 },
  { model: 'XGBoost', accuracy: 95.1, precision: 94.7, recall: 94.1, f1: 94.4 },
  { model: 'DNN', accuracy: 93.6, precision: 92.8, recall: 92.5, f1: 92.6 },
];

export const MODEL_BAR_DATA = [
  { metric: 'Accuracy', 'Random Forest': 94.2, XGBoost: 95.1, DNN: 93.6 },
  { metric: 'Precision', 'Random Forest': 93.8, XGBoost: 94.7, DNN: 92.8 },
  { metric: 'Recall', 'Random Forest': 92.9, XGBoost: 94.1, DNN: 92.5 },
  { metric: 'F1 Score', 'Random Forest': 93.3, XGBoost: 94.4, DNN: 92.6 },
];

export const CONFUSION_MATRIX = {
  labels: ['Normal', 'Analysis', 'DoS', 'Exploits', 'Recon'],
  matrix: [
    [1850, 32, 12, 8, 5],
    [28, 410, 15, 10, 7],
    [10, 18, 980, 22, 8],
    [6, 12, 19, 720, 14],
    [4, 9, 11, 16, 540],
  ],
};

export const PER_CLASS_PERFORMANCE = [
  { class: 'Normal', precision: 96.2, recall: 97.1, f1: 96.6 },
  { class: 'Analysis', precision: 87.5, recall: 88.1, f1: 87.8 },
  { class: 'DoS', precision: 94.1, recall: 93.8, f1: 93.9 },
  { class: 'Exploits', precision: 92.3, recall: 91.7, f1: 92.0 },
  { class: 'Recon', precision: 90.8, recall: 89.5, f1: 90.1 },
];

// ---- Explainability ----
export const SHAP_GLOBAL_IMPORTANCE = [
  { feature: 'Source Bytes', value: 0.42 },
  { feature: 'Destination Bytes', value: 0.35 },
  { feature: 'Duration', value: 0.28 },
  { feature: 'Packet Rate', value: 0.22 },
  { feature: 'Service', value: 0.18 },
  { feature: 'Connection Count', value: 0.15 },
  { feature: 'Source Port', value: 0.11 },
  { feature: 'Destination Port', value: 0.09 },
];

export const SHAP_CONTRIBUTIONS = [
  { feature: 'Source Bytes', positive: 0.31, negative: 0 },
  { feature: 'Destination Bytes', positive: 0.24, negative: 0 },
  { feature: 'Duration', positive: 0.18, negative: -0.04 },
  { feature: 'Packet Rate', positive: 0.12, negative: -0.02 },
  { feature: 'Service', positive: 0.08, negative: 0 },
  { feature: 'Connection Count', positive: 0, negative: -0.06 },
];

export const LIME_LOCAL_CONTRIBUTIONS = [
  { feature: 'Source Bytes', value: 0.21 },
  { feature: 'Duration', value: 0.14 },
  { feature: 'Destination Bytes', value: 0.11 },
  { feature: 'Packet Count', value: 0.09 },
  { feature: 'Service', value: 0.05 },
  { feature: 'Protocol', value: -0.03 },
];

// ---- Risk Assessment ----
export const RISK_BREAKDOWN = [
  { label: 'Prediction Confidence', value: 81.9, weight: 30, contribution: 24.6, color: '#06b6d4' },
  { label: 'Attack Severity', value: 45.0, weight: 30, contribution: 13.5, color: '#f59e0b' },
  { label: 'Feature Contribution', value: 38.0, weight: 25, contribution: 9.5, color: '#8b5cf6' },
  { label: 'Asset Criticality', value: 60.0, weight: 15, contribution: 9.0, color: '#ec4899' },
];

export const RISK_THRESHOLDS = [
  { range: '0–25', label: 'Low', color: '#10b981' },
  { range: '26–50', label: 'Medium', color: '#f59e0b' },
  { range: '51–75', label: 'High', color: '#f97316' },
  { range: '76–100', label: 'Critical', color: '#ef4444' },
];
