export interface Analyst {
  id: string;
  name: string;
  analyzedCount: number;
  avatarUrl?: string;
}

// Fix: Added the missing DashboardData interface to resolve the import error in services/googleSheetsService.ts.
export interface DashboardData {
  totalApplications: number;
  analyzedApplications: number;
  analysts: Analyst[];
  lastUpdated: Date;
}
