import { Monitor, ListVideo, CalendarDays, Clock } from "lucide-react";

/* 대시보드 상단 Stat 카드 더미 데이터 — ui-spec.md 참조 */
export const STAT_CARDS = [
  {
    icon: Monitor,
    label: "Displays",
    value: "9 screens available",
    action: undefined,
  },
  {
    icon: ListVideo,
    label: "Playlist",
    value: "Winter Special",
    action: { label: "Edit playlist", href: "/playlists" },
  },
  {
    icon: CalendarDays,
    label: "Schedule",
    value: "Autumn 2025",
    action: { label: "Edit schedule", href: "/schedule" },
  },
  {
    icon: Clock,
    label: "Pharmacy date & time",
    value: "July 5, 2026 at 9:12 AM GMT+9",
    wrapValue: true,
    action: undefined,
  },
] as const;

/* 대시보드 하단 화면 미리보기 더미 데이터 */
export const PREVIEW_SCREENS = [
  {
    id: 1,
    displayName: "Pharmacy Entry",
    planogramName: "Winter Special",
    /* 배경 그라디언트 색상 (이미지 없을 때 placeholder) */
    bgFrom: "#3B82F6",
    bgTo: "#1D4ED8",
    progress: 0.4,
  },
  {
    id: 2,
    displayName: "Screen 11",
    planogramName: "Winter Special",
    bgFrom: "#3B82F6",
    bgTo: "#1D4ED8",
    progress: 0.4,
  },
  {
    id: 3,
    displayName: "Screen 3",
    planogramName: "Demo — Skin Care",
    bgFrom: "#059669",
    bgTo: "#047857",
    progress: 0.65,
  },
  {
    id: 4,
    displayName: "Screen 4",
    planogramName: "Demo — Vitamins",
    bgFrom: "#2563EB",
    bgTo: "#1E40AF",
    progress: 0.3,
  },
  {
    id: 5,
    displayName: "Screen 5",
    planogramName: "Winter Special",
    bgFrom: "#3B82F6",
    bgTo: "#1D4ED8",
    progress: 0.8,
  },
] as const;
