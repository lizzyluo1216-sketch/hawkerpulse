
export enum CongestionLevel {
  EXTREME = '极度拥挤',
  CROWDED = '拥挤',
  SMOOTH = '通畅'
}

export interface Stall {
  id: string;
  name: string;
  queueCount: number;
  estimatedWait: number;
  label: string;
  subLabel: string;
  type: 'fast' | 'slow' | 'standard';
  image: string;
  stockCount: number; // Added stock count
}

export interface RedeemItem {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

export interface Medal {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface AppState {
  currentStallId: string | null;
  startTime: number | null;
  totalDuration: number | null;
  points: number;
  activeTab: 'home' | 'schedule' | 'mall';
}
