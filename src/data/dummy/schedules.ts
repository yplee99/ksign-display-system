export type ScheduleStatus = "Active" | "Running" | "Planned" | "Expired";

export interface Schedule {
  id: number;
  name: string;
  status: ScheduleStatus;
  validFrom: string;
  validUntil: string;
}

export const SCHEDULES: Schedule[] = [
  { id: 1, name: "The Elephant",     status: "Active",  validFrom: "July 24, 2026",      validUntil: "Indefinite" },
  { id: 2, name: "Another Schedule", status: "Active",  validFrom: "August 11, 2026",    validUntil: "Indefinite" },
  { id: 3, name: "Autumn 2025",      status: "Running", validFrom: "September 4, 2025",  validUntil: "Indefinite" },
  { id: 4, name: "Winter Promo",     status: "Planned", validFrom: "December 1, 2026",   validUntil: "January 31, 2027" },
];
