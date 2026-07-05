export type PlanogramType = "image" | "video";

export interface Planogram {
  id: number;
  name: string;
  type: PlanogramType;
  author: string;
  tags: string[];
  bgFrom: string;
  bgTo: string;
  isFavorite: boolean;
}

export const PLANOGRAMS: Planogram[] = [
  { id: 1,  name: "Winter Cold & Flu",    type: "image",  author: "Admin",    tags: ["winter","cold"],      bgFrom: "#3B82F6", bgTo: "#1D4ED8", isFavorite: true  },
  { id: 2,  name: "Skincare Summer",      type: "image",  author: "Admin",    tags: ["summer","skincare"],  bgFrom: "#EC4899", bgTo: "#BE185D", isFavorite: false },
  { id: 3,  name: "Vitamin Campaign",     type: "video",  author: "Admin",    tags: ["vitamin"],             bgFrom: "#F59E0B", bgTo: "#D97706", isFavorite: false },
  { id: 4,  name: "Pain Relief",          type: "image",  author: "Admin",    tags: ["pain"],                bgFrom: "#6366F1", bgTo: "#4338CA", isFavorite: true  },
  { id: 5,  name: "Children Health",      type: "image",  author: "Admin",    tags: ["children"],            bgFrom: "#10B981", bgTo: "#047857", isFavorite: false },
  { id: 6,  name: "Spring Allergy",       type: "image",  author: "Admin",    tags: ["spring","allergy"],   bgFrom: "#F472B6", bgTo: "#DB2777", isFavorite: false },
  { id: 7,  name: "Diabetes Care",        type: "image",  author: "Admin",    tags: ["diabetes"],            bgFrom: "#0EA5E9", bgTo: "#0369A1", isFavorite: false },
  { id: 8,  name: "Sleep & Stress",       type: "video",  author: "BD Rowa",  tags: ["stress","sleep"],     bgFrom: "#8B5CF6", bgTo: "#6D28D9", isFavorite: true  },
  { id: 9,  name: "Dental Hygiene",       type: "image",  author: "BD Rowa",  tags: ["dental"],              bgFrom: "#14B8A6", bgTo: "#0D9488", isFavorite: false },
  { id: 10, name: "Eye Care",             type: "image",  author: "BD Rowa",  tags: ["eye"],                 bgFrom: "#F97316", bgTo: "#C2410C", isFavorite: false },
  { id: 11, name: "Heart Health",         type: "image",  author: "Admin",    tags: ["heart"],               bgFrom: "#EF4444", bgTo: "#B91C1C", isFavorite: false },
  { id: 12, name: "Weight Management",    type: "video",  author: "BD Rowa",  tags: ["weight","diet"],      bgFrom: "#84CC16", bgTo: "#4D7C0F", isFavorite: false },
];
