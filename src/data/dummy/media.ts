export type MediaType = "background" | "header" | "video";

export interface MediaItem {
  id: number;
  name: string;
  type: MediaType;
  bgFrom: string;
  bgTo: string;
}

export const MEDIA_ITEMS: MediaItem[] = [
  /* 배경 이미지 */
  { id: 1,  name: "winter_bg.jpg",       type: "background", bgFrom: "#3B82F6", bgTo: "#1D4ED8" },
  { id: 2,  name: "summer_bg.jpg",       type: "background", bgFrom: "#F59E0B", bgTo: "#D97706" },
  { id: 3,  name: "spring_bg.jpg",       type: "background", bgFrom: "#10B981", bgTo: "#047857" },
  { id: 4,  name: "pharmacy_bg.jpg",     type: "background", bgFrom: "#6366F1", bgTo: "#4338CA" },
  { id: 5,  name: "health_bg.jpg",       type: "background", bgFrom: "#EC4899", bgTo: "#BE185D" },
  { id: 6,  name: "nature_bg.jpg",       type: "background", bgFrom: "#84CC16", bgTo: "#4D7C0F" },
  { id: 7,  name: "clean_bg.jpg",        type: "background", bgFrom: "#14B8A6", bgTo: "#0D9488" },
  { id: 8,  name: "autumn_bg.jpg",       type: "background", bgFrom: "#F97316", bgTo: "#C2410C" },
  /* 헤더 이미지 */
  { id: 9,  name: "header_promo.jpg",    type: "header",     bgFrom: "#8B5CF6", bgTo: "#6D28D9" },
  { id: 10, name: "header_sale.jpg",     type: "header",     bgFrom: "#EF4444", bgTo: "#B91C1C" },
  { id: 11, name: "header_vitamin.jpg",  type: "header",     bgFrom: "#0EA5E9", bgTo: "#0369A1" },
  /* 비디오 */
  { id: 12, name: "brand_video.mp4",     type: "video",      bgFrom: "#1C2B3A", bgTo: "#253548" },
  { id: 13, name: "product_intro.mp4",   type: "video",      bgFrom: "#374151", bgTo: "#1F2937" },
];
