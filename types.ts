export enum ThemeMode {
  CONCRETE = 'CONCRETE',
  BLUEPRINT = 'BLUEPRINT',
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string[];
}

export interface MaintenanceJob {
  id: string;
  task: string;
  location: string;
  time: string;
  status: 'pending' | 'active' | 'complete';
}
