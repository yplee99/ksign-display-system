export interface PulldownMenu {
  id: number;
  name: string;
  planogramCount: number;
  maxPlanograms: number;
  screens: string[];
  bgFrom: string;
  bgTo: string;
}

export const PULLDOWN_MENUS: PulldownMenu[] = [
  {
    id: 1,
    name: "CONSULTING PULLDOWN",
    planogramCount: 9,
    maxPlanograms: 50,
    screens: ["Pharmacy Entry"],
    bgFrom: "#7C3AED",
    bgTo: "#4F46E5",
  },
  {
    id: 2,
    name: "TEST PULLDOWN",
    planogramCount: 1,
    maxPlanograms: 50,
    screens: ["Shopping Window 1"],
    bgFrom: "#1D4ED8",
    bgTo: "#1E40AF",
  },
  {
    id: 3,
    name: "MAIN SCREEN MENU",
    planogramCount: 5,
    maxPlanograms: 50,
    screens: ["Screen 3", "Screen 4"],
    bgFrom: "#0D9488",
    bgTo: "#047857",
  },
];
