"use client";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { PULLDOWN_MENUS } from "@/data/dummy/pulldown-menus";

export default function PulldownMenusPage() {
  return (
    <div className="p-6">
      <PageHeader title="Pulldown Menus" subtitle="Here you can view and manage all pulldown menus."
        action={<Button icon={<Plus size={14} />}>New pulldown menu</Button>} />

      <div className="flex flex-wrap gap-6">
        {PULLDOWN_MENUS.map((menu) => (
          <div key={menu.id} className="w-[220px] flex flex-col gap-2">
            {/* 그라디언트 카드 */}
            <div className="rounded-lg overflow-hidden p-5 text-white"
              style={{ background: `linear-gradient(160deg, ${menu.bgFrom} 0%, ${menu.bgTo} 100%)` }}>
              <p className="text-[13px] font-bold tracking-wide mb-3">{menu.name}</p>
              <p className="text-[11px] text-white/70 mb-1">Number of planograms</p>
              <p className="text-[22px] font-bold leading-tight">
                {menu.planogramCount} From {menu.maxPlanograms}
              </p>
              <p className="text-[18px] font-bold">Selected</p>
            </div>

            {/* 스크린 선택 영역 */}
            <div className="border border-gray-200 rounded-lg p-2 bg-white">
              <select className="w-full text-[12px] text-gray-500 border-b border-gray-100 pb-1 mb-2 bg-transparent focus:outline-none">
                <option>Select screens</option>
              </select>
              <div className="flex flex-wrap gap-1">
                {menu.screens.map((screen) => (
                  <span key={screen} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full">
                    {screen} <X size={10} className="cursor-pointer hover:text-red-500" />
                  </span>
                ))}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex items-center gap-3 px-1">
              <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              <button className="text-gray-400 hover:text-primary transition-colors ml-auto"><Pencil size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
