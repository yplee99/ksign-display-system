"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LayoutGrid,
  ListVideo,
  CalendarDays,
  AlignJustify,
  ImageIcon,
  Tag,
  Settings2,
  Building2,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

/* ui-spec.md 기준 사이드바 메뉴 정의 */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",        href: "/dashboard" },
  { icon: LayoutGrid,      label: "Planograms",       href: "/planograms" },
  { icon: ListVideo,       label: "Playlists",        href: "/playlists" },
  { icon: CalendarDays,    label: "Schedule",         href: "/schedule" },
  { icon: AlignJustify,    label: "Pulldown Menus",   href: "/pulldown-menus" },
  { icon: ImageIcon,       label: "Media",            href: "/media" },
  { icon: Tag,             label: "Products",         href: "/products" },
  { icon: Settings2,       label: "Vmotion Settings", href: "/settings" },
  { icon: Building2,       label: "My Organizations", href: "/organizations" },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "flex flex-col bg-sidebar-bg text-sidebar-text flex-shrink-0",
        "transition-[width] duration-300 ease-in-out",
        "min-h-screen sticky top-0",
        collapsed ? "w-[60px]" : "w-[160px]"
      )}
    >
      {/* ── 로고 영역 ── */}
      <div
        className={clsx(
          "flex items-center gap-2.5 h-14 border-b border-white/10 flex-shrink-0",
          collapsed ? "justify-center px-0" : "px-4"
        )}
      >
        {/* 별 아이콘 (BD Rowa 로고 placeholder) */}
        <div className="w-6 h-6 flex-shrink-0 bg-primary rounded-full flex items-center justify-center shadow-sm">
          <span className="text-white text-[9px] font-black leading-none select-none">
            ★
          </span>
        </div>

        {/* 확장 상태에서만 텍스트 표시 */}
        <div
          className={clsx(
            "overflow-hidden transition-all duration-300",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          <div className="flex items-baseline gap-0.5 whitespace-nowrap">
            <span className="text-[13px] font-bold text-white tracking-wide">
              BD Rowa
            </span>
            <span className="text-[9px] text-white/60 align-super">™</span>
            <span className="text-[11px] text-white/50 ml-1">Vcloud</span>
          </div>
        </div>
      </div>

      {/* ── 네비게이션 메뉴 ── */}
      <nav className="flex-1 py-1.5 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          /* 정확한 경로 매칭 — /dashboard는 /dashboard만 활성, /planograms는 하위 경로도 포함 */
          const isActive =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href + "/"));

          return (
            <Link
              key={href}
              href={href}
              title={label}                   /* 툴팁: 항상 표시 (접힌 상태에서 특히 유용) */
              className={clsx(
                "group relative flex items-center gap-3 py-[9px] text-[13px]",
                "transition-colors duration-150",
                collapsed ? "px-0 justify-center" : "px-4",
                isActive
                  ? "bg-sidebar-active text-white font-medium"
                  : "text-sidebar-muted hover:bg-sidebar-active/70 hover:text-white"
              )}
            >
              {/* 활성 상태 좌측 인디케이터 */}
              {isActive && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r-full"
                  aria-hidden="true"
                />
              )}

              <Icon
                size={15}
                className={clsx(
                  "flex-shrink-0 transition-colors duration-150",
                  isActive
                    ? "text-white"
                    : "text-sidebar-muted group-hover:text-white"
                )}
              />

              {/* 확장 상태에서만 레이블 표시 */}
              <span
                className={clsx(
                  "overflow-hidden whitespace-nowrap transition-all duration-300",
                  collapsed ? "w-0 opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── 하단 토글 버튼 ── */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className={clsx(
          "flex items-center gap-2 h-10 border-t border-white/10 flex-shrink-0",
          "text-sidebar-muted hover:text-white hover:bg-sidebar-active/70",
          "transition-colors duration-150 text-xs w-full",
          collapsed ? "justify-center px-0" : "px-4"
        )}
        aria-label={collapsed ? "메뉴 펼치기" : "메뉴 접기"}
      >
        <ChevronLeft
          size={14}
          className={clsx(
            "flex-shrink-0 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
        <span
          className={clsx(
            "whitespace-nowrap overflow-hidden transition-all duration-300",
            collapsed ? "w-0 opacity-0" : "opacity-100"
          )}
        >
          Toggle navigation menu
        </span>
      </button>
    </aside>
  );
}
