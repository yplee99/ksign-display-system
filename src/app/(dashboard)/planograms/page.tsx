"use client";
import { useState } from "react";
import { Star, Pencil, Copy, Trash2, Video, Plus, SlidersHorizontal, LayoutGrid, List, Search } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { PLANOGRAMS, Planogram } from "@/data/dummy/planograms";

type ContentType = "all" | "image" | "video";

function PlanogramCard({ p }: { p: Planogram }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
      <div className="relative h-[220px] flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${p.bgFrom} 0%, ${p.bgTo} 100%)` }}>
        {p.type === "video" && (
          <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
            <Video size={10} /> Video
          </span>
        )}
        <span className="text-white/80 text-[11px] font-medium px-3 text-center leading-snug drop-shadow">{p.name}</span>
        <div className="absolute inset-x-3 bottom-10 h-px bg-white/20" />
        <div className="absolute inset-x-3 bottom-18 h-px bg-white/20" />
      </div>
      <div className="px-3 py-2 flex-1 flex flex-col gap-1">
        <p className="text-[13px] font-medium text-gray-900 truncate">{p.name}</p>
        <div className="flex flex-wrap gap-1">
          {p.tags.map((tag) => (
            <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 mt-auto">{p.author}</p>
      </div>
      <div className="px-3 py-2 border-t border-gray-100 flex items-center justify-between">
        <button className={p.isFavorite ? "text-amber-400" : "text-gray-300 hover:text-amber-400"}>
          <Star size={14} fill={p.isFavorite ? "currentColor" : "none"} />
        </button>
        <div className="flex items-center gap-2">
          <Link href={"/planograms/" + p.id + "/edit"} className="text-gray-300 hover:text-primary transition-colors"><Pencil size={13} /></Link>
          <button className="text-gray-300 hover:text-gray-600 transition-colors"><Copy size={13} /></button>
          <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
        </div>
      </div>
    </div>
  );
}

export default function PlanogramsPage() {
  const [contentType, setContentType] = useState<ContentType>("all");
  const [search, setSearch] = useState("");

  const filtered = PLANOGRAMS.filter((p) => {
    const matchType = contentType === "all" || p.type === contentType;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="p-6">
      <PageHeader title="Planograms" subtitle="Here you can view and manage all planograms."
        action={<Button icon={<Plus size={14} />}>New planogram</Button>} />

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {/* 필터/검색 바 */}
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          {/* 콘텐츠 타입 탭 */}
          <div className="flex items-center gap-1">
            {(["all", "image", "video"] as ContentType[]).map((t) => (
              <button key={t} onClick={() => setContentType(t)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-full border transition-colors ${
                  contentType === t
                    ? "bg-primary-light border-primary text-primary"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                {t === "all" ? "All Planograms" : t === "image" ? "Image Planograms" : "Video Planograms"}
              </button>
            ))}
          </div>

          {/* 우측 컨트롤 */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-7 pr-3 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-primary w-40" />
            </div>
            <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">
              <SlidersHorizontal size={14} />
            </button>
            <button className="p-1.5 border border-gray-200 rounded-md text-primary bg-primary-light">
              <LayoutGrid size={14} />
            </button>
            <button className="p-1.5 border border-gray-200 rounded-md text-gray-400 hover:bg-gray-50">
              <List size={14} />
            </button>
          </div>
        </div>

        {/* 카드 그리드 */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-[13px]">No planograms found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((p) => <PlanogramCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
