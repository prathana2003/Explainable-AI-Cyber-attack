// Centralized color tokens for charts and UI accents

export const CHART_COLORS = {
  cyan: '#06b6d4',
  blue: '#3b82f6',
  emerald: '#10b981',
  amber: '#f59e0b',
  orange: '#f97316',
  red: '#ef4444',
  rose: '#f43f5e',
  violet: '#8b5cf6',
  pink: '#ec4899',
  teal: '#14b8a6',
  slate: '#64748b',
};

export const ATTACK_COLORS: Record<string, string> = {
  Normal: '#10b981',
  Analysis: '#06b6d4',
  Backdoor: '#8b5cf6',
  DoS: '#ef4444',
  Exploits: '#f97316',
  Fuzzers: '#eab308',
  Generic: '#3b82f6',
  Reconnaissance: '#ec4899',
  Shellcode: '#14b8a6',
  Worms: '#f43f5e',
};

export const RISK_COLORS: Record<string, string> = {
  Low: '#10b981',
  Medium: '#f59e0b',
  High: '#f97316',
  Critical: '#ef4444',
};

export const MODEL_COLORS: Record<string, string> = {
  'Random Forest': '#06b6d4',
  XGBoost: '#3b82f6',
  DNN: '#8b5cf6',
};
