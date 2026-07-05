export interface Playlist {
  id: number;
  name: string;
  usedIn: string | null;
  createdAt: string;
}

export const PLAYLISTS: Playlist[] = [
  { id: 1, name: "Winter Special",   usedIn: null,                     createdAt: "31 January 2026"  },
  { id: 2, name: "Spring Campaign",  usedIn: null,                     createdAt: "26 December 2025" },
  { id: 3, name: "Daily Rotation",   usedIn: "Used in one schedule",   createdAt: "14 December 2025" },
  { id: 4, name: "Promo Week",       usedIn: null,                     createdAt: "1 December 2025"  },
  { id: 5, name: "Main Playlist",    usedIn: "Used in one schedule",   createdAt: "15 October 2025"  },
];

export interface SharedTemplate {
  id: number;
  name: string;
  sharedBy: string;
  slots: number;
  createdAt: string;
}

export const SHARED_TEMPLATES: SharedTemplate[] = [
  { id: 1, name: "Chain Template A", sharedBy: "BD Rowa Germany", slots: 4, createdAt: "16 December 2025" },
  { id: 2, name: "Seasonal Base",    sharedBy: "BD Rowa Germany", slots: 3, createdAt: "10 November 2025" },
];
