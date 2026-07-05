"use client";

import { ChevronDown, UserCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

/* 대시보드 상단 우측 프로필 메뉴 */
export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-14 flex items-center justify-end px-6 bg-white border-b border-gray-200 flex-shrink-0">
      {/* 프로필 드롭다운 버튼 */}
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm",
            "text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          )}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {/* 아바타 아이콘 */}
          <UserCircle2 size={22} className="text-gray-500 flex-shrink-0" />

          <div className="text-left hidden sm:block">
            <p className="text-[13px] font-medium text-gray-900 leading-tight">
              Admin User
            </p>
            <p className="text-[11px] text-gray-400 leading-tight">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={14}
            className={clsx(
              "text-gray-400 flex-shrink-0 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </button>

        {/* 드롭다운 메뉴 */}
        {open && (
          <>
            {/* 배경 클릭 시 닫기 */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 text-[13px]">
              <Link href="/profile" onClick={() => setOpen(false)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                Profiles
              </Link>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                Release notes
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                Vmotion Cloud Training
              </button>
              <hr className="my-1 border-gray-100" />
              <Link href="/login" onClick={() => setOpen(false)}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 flex items-center gap-2">
                Logout
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
