"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LayoutGrid,
  ListVideo,
  CalendarDays,
  AlignJustify,
  Image,
  Tag,
  Settings,
  Building2,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

/* 사이드바 메뉴 정의 — ui-spec.md 기준 */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",        href: "/dashboard" },
  { icon: LayoutGrid,      label: "Planograms",       href: "/planograms" },
  { icon: ListVideo,       label: "Playlists",        href: "/playlists" },
  { icon: CalendarDays,    label: "Schedule",         href: "/schedule" },
  { icon: AlignJustify,    label: "Pulldown Menus",   href: "/pulldown-menus" },
  { icon: Image,           label: "Media",            href: "/media" },
  { icon: Tag,             label: "Products",         href: "/products" },
  { icon: Settings,        label: "Vmotion Settings", href: "/settings" },
  { icon: Building2,       label: "My Organizations", href: "/organizations" },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "flex flex-col bg-sidebar-bg text-sidebar-text",
        "transition-all duration-300 min-h-screen flex-shrink-0",
        collapsed ? "w-[60px]" : "w-[160px]"
      )}
    >
      {/* 로고 영역 */}
      <div
        className={clsx(
          "flex items-center gap-2 border-b border-white/10",
          collapsed ? "px-[18px] py-4 justify-center" : "px-4 py-4"
        )}
      >
        {/* 별 모양 로고 아이콘 (placeholder) */}
        <div className="w-6 h-6 flex-shrink-0 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white text-[10px] font-bold leading-none">K</span>
        </div>
        {!collapsed && (
          <div className="flex items-baseline gap-1 overflow-hidden">
            <span className="text-sm font-semibold text-white truncate">BD Rowa</span>
            <span className="text-[10px] text-sidebar-muted truncate">™</span>
            <span className="text-xs text-sidebar-muted truncate">Vcloud</span>
          </div>
        )}
      </div>

      {/* 네비게이션 메뉴 목록 */}
      <nav className="flex-1 py-2 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={clsx(
                "flex items-center gap-3 py-2.5 text-sm transition-colors relative",
                collapsed ? "px-[18px] justify-center" : "px-4",
                isActive
                  ? [
                      "bg-sidebar-active text-white",
                      "before:absolute before:left-0 before:top-0 before:bottom-0",
                      "before:w-[3px] before:bg-primary before:rounded-r-sm",
                    ]
                  : "text-sidebar-muted hover:bg-sidebar-active hover:text-white"
              )}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* 하단 토글 버튼 */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className={clsx(
          "flex items-center gap-2 py-3 border-t border-white/10",
          "text-sidebar-muted hover:text-white hover:bg-sidebar-active",
          "transition-colors text-sm w-full",
          collapsed ? "px-[18px] justify-center" : "px-4"
        )}
        aria-label={collapsed ? "메뉴 펼치기" : "메뉴 접기"}
      >
        <ChevronLeft
          size={16}
          className={clsx(
            "flex-shrink-0 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
        {!collapsed && (
          <span className="truncate text-xs">Toggle navigation menu</span>
        )}
      </button>
    </aside>
  );
}
