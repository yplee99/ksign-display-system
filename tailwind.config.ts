import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /* 사이드바 */
        sidebar: {
          bg: "#1C2B3A",
          active: "#253548",
          text: "#FFFFFF",
          muted: "#94A3B8",
        },
        /* 포인트 컬러 */
        primary: {
          DEFAULT: "#14B8A6",
          hover: "#0D9488",
          light: "#CCFBF1",
        },
        /* 메인 콘텐츠 */
        content: {
          bg: "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "page-title": ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        "page-sub": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      width: {
        sidebar: "160px",
        "sidebar-collapsed": "60px",
      },
    },
  },
  plugins: [],
};

export default config;
