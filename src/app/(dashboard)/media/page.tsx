"use client";
import { useState } from "react";
import { Upload, Pencil, Trash2, Video } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { MEDIA_ITEMS, MediaType } from "@/data/dummy/media";

type Tab = "background" | "header" | "video";

function MediaCard({ item }: { item: { id: number; name: string; type: MediaType; bgFrom: string; bgTo: string } }) {
  return (
    <div className="relative group rounded-lg overflow-hidden aspect-[3/4] cursor-pointer">
      <div className="w-full h-full" style={{ background: `linear-gradient(160deg, ${item.bgFrom} 0%, ${item.bgTo} 100%)` }}>
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Video size={28} className="text-white/70" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
        <button className="w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors">
          <Pencil size={14} />
        </button>
        <button className="w-8 h-8 bg-white/20 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
      <p className="absolute bottom-0 inset-x-0 px-2 py-1.5 bg-black/30 text-white text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
        {item.name}
      </p>
    </div>
  );
}

export default function MediaPage() {
  const [tab, setTab] = useState<Tab>("background");

  const TAB_MAP: Record<Tab, MediaType> = { background: "background", header: "header", video: "video" };
  const filtered = MEDIA_ITEMS.filter((m) => m.type === TAB_MAP[tab]);

  return (
    <div className="p-6">
      <PageHeader title="Media" subtitle="Here you can upload, manage and edit all media."
        action={<Button icon={<Upload size={14} />}>Upload</Button>} />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center px-4 pt-3 pb-0 border-b border-gray-200 gap-0">
          {(["background", "header", "video"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${
                tab === t ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t === "background" ? "Background Images" : t === "header" ? "Header Images" : "Videos"}
            </button>
          ))}
        </div>

        <div className="p-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-[13px]">No media files found</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {filtered.map((item) => <MediaCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
