"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, X, Trash2, Copy, Pencil, Plus } from "lucide-react";
import { SCHEDULES } from "@/data/dummy/schedules";
import { PLAYLISTS } from "@/data/dummy/playlists";
import clsx from "clsx";

const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
const HOURS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

/* 각 셀(요일+시간)에 배치할 플레이리스트 블록 */
interface Block {
  day: string;
  startHour: number;
  endHour: number;
  playlistName: string;
  color: string;
}

const INIT_BLOCKS: Block[] = [
  { day: "TUESDAY",   startHour: 5,  endHour: 19, playlistName: "Demo mode",   color: "#14B8A6" },
  { day: "THURSDAY",  startHour: 1,  endHour: 15, playlistName: "Demo mode",   color: "#14B8A6" },
  { day: "SATURDAY",  startHour: 0,  endHour: 24, playlistName: "Demo mode",   color: "#14B8A6" },
  { day: "SUNDAY",    startHour: 0,  endHour: 24, playlistName: "Demo mode",   color: "#14B8A6" },
];

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  const schedule = SCHEDULES.find((s) => s.id === Number(params.id)) ?? SCHEDULES[0];
  const [name, setName] = useState(schedule.name);
  const [dateFrom] = useState(schedule.validFrom);
  const [blocks, setBlocks] = useState<Block[]>(INIT_BLOCKS);
  const [hoveredCell, setHoveredCell] = useState<{ day: string; hour: number } | null>(null);

  /* 특정 셀에 블록 추가 */
  const addBlock = (day: string, hour: number) => {
    setBlocks((prev) => [
      ...prev,
      { day, startHour: hour, endHour: Math.min(hour + 4, 24), playlistName: "Main Playlist", color: "#6366F1" },
    ]);
  };

  const removeBlock = (idx: number) => setBlocks((prev) => prev.filter((_, i) => i !== idx));

  /* 각 시간 셀의 높이 (px) */
  const CELL_H = 32;

  return (
    <div className="p-6 h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-3 flex-shrink-0">
        <Link href="/schedule" className="hover:text-primary">Schedule</Link>
        <ChevronRight size={14} />
        <span className="text-primary font-medium">{name}</span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 flex flex-col flex-1 overflow-hidden">
        {/* 스케줄 헤더 */}
        <div className="flex items-center gap-6 px-5 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-gray-500">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="border-b border-dashed border-gray-300 text-[13px] text-gray-800 focus:outline-none focus:border-primary bg-transparent w-40" />
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-500">Date from</span>
              <input type="text" defaultValue={dateFrom}
                className="border border-gray-200 rounded px-2 py-1 text-[12px] text-gray-700 focus:outline-none focus:border-primary w-36" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-500">Date to</span>
              <input type="text" defaultValue="Indefinite"
                className="border border-gray-200 rounded px-2 py-1 text-[12px] text-gray-700 focus:outline-none focus:border-primary w-28" />
            </div>
          </div>
        </div>

        {/* 주간 캘린더 */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-[900px]">
            {/* 요일 헤더 */}
            <div className="flex border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="w-14 flex-shrink-0" />
              {DAYS.map((day) => (
                <div key={day} className="flex-1 text-center text-[11px] font-semibold text-gray-400 py-2 uppercase tracking-wide border-l border-gray-100">
                  {day}
                </div>
              ))}
            </div>

            {/* 시간 행 + 셀 */}
            <div className="relative">
              {HOURS.map((hour, hourIdx) => (
                <div key={hour} className="flex border-b border-gray-50" style={{ height: CELL_H }}>
                  {/* 시간 레이블 */}
                  <div className="w-14 flex-shrink-0 flex items-center justify-end pr-2 text-[10px] text-gray-400 border-r border-gray-100">
                    {hour}
                  </div>
                  {/* 요일별 셀 */}
                  {DAYS.map((day) => (
                    <div key={day}
                      className={clsx(
                        "flex-1 border-l border-gray-100 relative group cursor-pointer",
                        hoveredCell?.day === day && hoveredCell?.hour === hourIdx ? "bg-blue-50" : "hover:bg-gray-50"
                      )}
                      onMouseEnter={() => setHoveredCell({ day, hour: hourIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => addBlock(day, hourIdx)}
                    >
                      {/* + 버튼 (hover 시) */}
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus size={12} className="text-gray-300" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}

              {/* 블록 오버레이 */}
              {blocks.map((block, idx) => {
                const dayIndex = DAYS.indexOf(block.day);
                if (dayIndex === -1) return null;
                const top = block.startHour * CELL_H;
                const height = (block.endHour - block.startHour) * CELL_H;
                const left = `calc(${(dayIndex / 7) * 100}% + 56px + ${dayIndex + 1}px)`;
                const width = `calc(${(1 / 7) * 100}% - 2px)`;

                return (
                  <div key={idx}
                    className="absolute rounded overflow-hidden border border-white/30 shadow-sm group"
                    style={{ top, height, left, width, backgroundColor: block.color + "dd" }}>
                    <div className="px-2 py-1.5">
                      <p className="text-white text-[11px] font-semibold truncate">{block.playlistName}</p>
                      <p className="text-white/70 text-[10px]">
                        {String(block.startHour).padStart(2, "0")}:00 - {String(block.endHour).padStart(2, "0")}:00
                      </p>
                    </div>
                    {/* 블록 액션 (hover 시) */}
                    <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); removeBlock(idx); }}
                        className="w-5 h-5 bg-black/20 hover:bg-black/40 rounded flex items-center justify-center">
                        <Trash2 size={10} className="text-white" />
                      </button>
                      <button className="w-5 h-5 bg-black/20 hover:bg-black/40 rounded flex items-center justify-center">
                        <Copy size={10} className="text-white" />
                      </button>
                      <button className="w-5 h-5 bg-black/20 hover:bg-black/40 rounded flex items-center justify-center">
                        <Pencil size={10} className="text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="flex items-center justify-between mt-3 flex-shrink-0">
        <button className="flex items-center gap-1 text-[13px] text-red-400 hover:text-red-600 transition-colors">
          <Trash2 size={14} /> Delete
        </button>
        <div className="flex gap-2">
          <Link href="/schedule"
            className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 px-3 py-1.5">
            <X size={14} /> Cancel
          </Link>
          <button className="bg-primary text-white text-[13px] font-medium px-5 py-1.5 rounded-full hover:bg-primary-hover transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
