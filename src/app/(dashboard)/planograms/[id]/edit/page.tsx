"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid, Save, Copy, Trash2, X, Search,
  AlignLeft, AlignCenter, AlignRight,
  ImageIcon, Pencil, Rows3, Tag, ChevronDown,
} from "lucide-react";
import { PLANOGRAMS } from "@/data/dummy/planograms";
import { MEDIA_ITEMS } from "@/data/dummy/media";
import { PRODUCTS } from "@/data/dummy/products";
import clsx from "clsx";

type EditorTab = "media" | "design" | "shelves" | "products";
type MediaType = "background" | "header" | "video";
type Alignment = "left" | "center" | "right";

const TAB_CONFIG = [
  { key: "media"    as EditorTab, label: "Media",    icon: ImageIcon  },
  { key: "design"   as EditorTab, label: "Design",   icon: Pencil     },
  { key: "shelves"  as EditorTab, label: "Shelves",  icon: Rows3      },
  { key: "products" as EditorTab, label: "Products", icon: Tag        },
];

/* ── 오른쪽 설정 패널 탭들 ── */
function MediaPanel() {
  const [mediaType, setMediaType] = useState<MediaType>("background");
  const [search, setSearch] = useState("");
  const filtered = MEDIA_ITEMS.filter(
    (m) => m.type === mediaType && m.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-4 space-y-3">
      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-2">Media</div>
      <div>
        <label className="text-[11px] text-gray-400 block mb-1">Media type</label>
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value as MediaType)}
          className="w-full bg-sidebar-active text-white text-[12px] px-3 py-2 rounded border border-white/10 focus:outline-none"
        >
          <option value="background">Background images</option>
          <option value="header">Header images</option>
          <option value="video">Videos</option>
        </select>
      </div>
      <div>
        <label className="text-[11px] text-gray-400 block mb-1">Search by name or tag</label>
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-sidebar-active text-white text-[12px] pl-7 pr-3 py-2 rounded border border-white/10 focus:outline-none placeholder:text-gray-600"
          />
        </div>
      </div>
      {/* 미디어 그리드 */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {/* "No background" placeholder */}
        <button className="aspect-[3/4] rounded border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-1 text-gray-600 hover:border-primary hover:text-primary transition-colors">
          <ImageIcon size={20} />
          <span className="text-[10px]">No background image</span>
        </button>
        {filtered.slice(0, 5).map((m) => (
          <button
            key={m.id}
            className="aspect-[3/4] rounded overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
            style={{ background: `linear-gradient(160deg, ${m.bgFrom}, ${m.bgTo})` }}
          />
        ))}
      </div>
    </div>
  );
}

function DesignPanel({ title, setTitle }: { title: string; setTitle: (v: string) => void }) {
  const [showHeader, setShowHeader] = useState(true);
  const [alignment, setAlignment] = useState<Alignment>("center");
  const [bgColor, setBgColor] = useState("#1a1a2e");
  const [headerBg, setHeaderBg] = useState("#1C2B3A");
  const [fontIndex, setFontIndex] = useState(0);
  const [fontSize, setFontSize] = useState("Extra large");
  const [subtitle, setSubtitle] = useState("");

  return (
    <div className="p-4 space-y-4 text-[12px]">
      {/* Background */}
      <div>
        <button className="flex items-center gap-1 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-3">
          <ChevronDown size={12} /> Background
        </button>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">COLOR</span>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
            className="w-10 h-7 rounded cursor-pointer bg-transparent border border-white/20" />
        </div>
      </div>
      <hr className="border-white/10" />
      {/* Header */}
      <div>
        <button className="flex items-center gap-1 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-3">
          <ChevronDown size={12} /> Header
        </button>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">SHOW</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showHeader} onChange={(e) => setShowHeader(e.target.checked)} className="accent-primary" />
              <span className="text-white">Show header</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">ALIGNMENT</span>
            <div className="flex gap-1">
              {(["left", "center", "right"] as Alignment[]).map((a) => (
                <button key={a} onClick={() => setAlignment(a)}
                  className={clsx("w-8 h-7 rounded flex items-center justify-center transition-colors",
                    alignment === a ? "bg-primary" : "bg-sidebar-active hover:bg-white/10")}>
                  {a === "left" ? <AlignLeft size={12} /> : a === "center" ? <AlignCenter size={12} /> : <AlignRight size={12} />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">BACKGROUND COLOR</span>
            <input type="color" value={headerBg} onChange={(e) => setHeaderBg(e.target.value)}
              className="w-10 h-7 rounded cursor-pointer bg-transparent border border-white/20" />
          </div>
          <div className="border border-white/10 rounded p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">FONT</span>
              <select value={fontIndex} onChange={(e) => setFontIndex(Number(e.target.value))}
                className="bg-sidebar-active text-white text-[11px] px-2 py-1 rounded border border-white/10 focus:outline-none">
                {["Inter", "Fancy", "Serif", "Mono"].map((f, i) => <option key={f} value={i}>{f}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">FONT SIZE</span>
              <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}
                className="bg-sidebar-active text-white text-[11px] px-2 py-1 rounded border border-white/10 focus:outline-none">
                {["Small", "Medium", "Large", "Extra large"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">TEXT COLOR</span>
              <input type="color" defaultValue="#ffffff"
                className="w-10 h-7 rounded cursor-pointer bg-transparent border border-white/20" />
            </div>
          </div>
          <div className="border border-white/10 rounded p-3 space-y-2">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400">TITLE</span>
                <span className="text-gray-600 text-[10px]">{title.length} / 24</span>
              </div>
              <input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 24))}
                className="w-full bg-sidebar-active text-white text-[12px] px-2 py-1.5 rounded border border-white/10 focus:outline-none" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400">SUBTITLE</span>
                <span className="text-gray-600 text-[10px]">{subtitle.length} / 24</span>
              </div>
              <input value={subtitle} onChange={(e) => setSubtitle(e.target.value.slice(0, 24))}
                placeholder="Enter text"
                className="w-full bg-sidebar-active text-white text-[12px] px-2 py-1.5 rounded border border-white/10 focus:outline-none placeholder:text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShelvesPanel({ shelfCount, setShelfCount }: { shelfCount: number; setShelfCount: (n: number) => void }) {
  const [alignEqual, setAlignEqual] = useState(false);
  const [marginLeft, setMarginLeft] = useState(81);
  const [marginRight, setMarginRight] = useState(81);
  return (
    <div className="p-4 space-y-4 text-[12px]">
      <button className="flex items-center gap-1 text-[11px] text-gray-400 font-medium uppercase tracking-wide">
        <ChevronDown size={12} /> Shelf properties
      </button>
      <button className="flex items-center gap-1 text-[11px] text-gray-400 font-medium uppercase tracking-wide">
        <ChevronDown size={12} /> Shelves
      </button>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">COUNT</span>
            <div className="flex items-center gap-2">
              <input type="range" min={1} max={8} value={shelfCount} onChange={(e) => setShelfCount(Number(e.target.value))}
                className="w-28 accent-primary" />
              <input type="number" min={1} max={8} value={shelfCount} onChange={(e) => setShelfCount(Number(e.target.value))}
                className="w-12 bg-sidebar-bg text-white text-[12px] text-center px-1 py-1 rounded border border-white/20 focus:outline-none" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">PRODUCTS MARGIN FROM EDGE</span>
            <label className="flex items-center gap-1 text-[11px] text-white cursor-pointer">
              <input type="checkbox" checked={alignEqual} onChange={(e) => setAlignEqual(e.target.checked)} className="accent-primary" />
              Align left and right equally
            </label>
          </div>
          {(alignEqual ? [["LEFT & RIGHT", marginLeft, (v: number) => { setMarginLeft(v); setMarginRight(v); }]] :
            [["LEFT", marginLeft, setMarginLeft], ["RIGHT", marginRight, setMarginRight]]).map(([label, val, setter]) => (
            <div key={label as string} className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{label as string}</span>
              <div className="flex items-center gap-2">
                <input type="range" min={0} max={200} value={val as number}
                  onChange={(e) => (setter as (n: number) => void)(Number(e.target.value))}
                  className="w-28 accent-primary" />
                <input type="number" min={0} max={200} value={val as number}
                  onChange={(e) => (setter as (n: number) => void)(Number(e.target.value))}
                  className="w-12 bg-sidebar-bg text-white text-[12px] text-center px-1 py-1 rounded border border-white/20 focus:outline-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsPanel() {
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-4 space-y-3 text-[12px]">
      <div className="relative">
        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name, code..."
          className="w-full bg-sidebar-active text-white text-[12px] pl-7 pr-3 py-2 rounded border border-white/10 focus:outline-none placeholder:text-gray-600" />
      </div>
      {/* Locked area */}
      <div className="border border-dashed border-white/20 rounded p-3 text-gray-600 text-center text-[11px]">
        Locked area — drag here to reserve space
      </div>
      {/* 제품 목록 */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-hide">
        {filtered.map((p) => (
          <div key={p.id} draggable
            className="flex items-center gap-2 p-2 rounded hover:bg-sidebar-active cursor-grab transition-colors">
            <div className="w-8 h-10 rounded bg-sidebar-active flex-shrink-0 border border-white/10" />
            <div className="min-w-0">
              <p className="text-white text-[11px] truncate">{p.name}</p>
              <p className="text-gray-500 text-[10px]">{p.packSize} · {p.price !== null ? "€" + p.price.toFixed(2) : "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 캔버스 (플래노그램 미리보기) ── */
function PlanogramCanvas({ shelfCount, title, bgFrom, bgTo }: {
  shelfCount: number; title: string; bgFrom: string; bgTo: string;
}) {
  const shelves = Array.from({ length: shelfCount });
  return (
    <div className="relative w-full h-full flex flex-col rounded overflow-hidden border border-white/10"
      style={{ background: `linear-gradient(180deg, ${bgFrom} 0%, ${bgTo} 100%)` }}>
      {/* 헤더 */}
      {title && (
        <div className="px-4 py-3 text-white text-center font-semibold text-sm">{title}</div>
      )}
      {/* 선반들 */}
      <div className="flex-1 flex flex-col justify-evenly px-4 py-2 gap-2">
        {shelves.map((_, i) => (
          <div key={i} className="flex-1 border-b border-white/20 relative min-h-[40px]">
            {/* 더미 제품 박스 */}
            <div className="absolute bottom-1 left-2 right-2 flex gap-1">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex-1 bg-white/20 rounded-sm h-10 border border-white/30" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 메인 편집기 페이지 ── */
export default function PlanogramEditPage({ params }: { params: { id: string } }) {
  const planogram = PLANOGRAMS.find((p) => p.id === Number(params.id)) ?? PLANOGRAMS[0];
  const [tab, setTab] = useState<EditorTab>("media");
  const [planogramName, setPlanogramName] = useState(planogram.name);
  const [title, setTitle] = useState(planogram.name);
  const [shelfCount, setShelfCount] = useState(5);
  const [zoom, setZoom] = useState(100);

  return (
    /* 편집기: 대시보드 레이아웃 main 영역을 꽉 채우는 어두운 UI */
    <div className="flex flex-col h-[calc(100vh-56px)] bg-[#111827] text-white overflow-hidden">

      {/* ── 상단 툴바 ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-sidebar-bg border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">Planogram name</span>
          <input
            value={planogramName}
            onChange={(e) => setPlanogramName(e.target.value)}
            className="bg-sidebar-active text-white text-[13px] px-3 py-1.5 rounded border border-white/20 focus:outline-none focus:border-primary w-48"
          />
        </div>
        <div className="flex items-center gap-3">
          <select value={zoom} onChange={(e) => setZoom(Number(e.target.value))}
            className="bg-sidebar-active text-white text-[12px] px-2 py-1 rounded border border-white/20 focus:outline-none">
            {[50, 75, 100, 125, 150].map((z) => <option key={z} value={z}>{z} %</option>)}
          </select>
          <button className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-[12px] font-medium px-4 py-1.5 rounded-full transition-colors">
            <Save size={13} /> Save
          </button>
          <Link href="/planograms"
            className="flex items-center gap-1 text-gray-400 hover:text-white text-[12px] transition-colors">
            <X size={14} /> Close
          </Link>
        </div>
      </div>

      {/* ── 편집기 바디 ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* 좌측 미니 아이콘 툴바 */}
        <div className="w-10 flex-shrink-0 bg-sidebar-bg border-r border-white/10 flex flex-col items-center py-3 gap-1">
          {[
            { icon: LayoutGrid, label: "Overview" },
            { icon: Save,       label: "Save"     },
            { icon: Copy,       label: "Copy"     },
            { icon: Trash2,     label: "Delete"   },
          ].map(({ icon: Icon, label }) => (
            <button key={label} title={label}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-sidebar-active rounded transition-colors">
              <Icon size={15} />
            </button>
          ))}
        </div>

        {/* 중앙 캔버스 */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto bg-[#0d1117]">
          <div style={{ width: `${zoom}%`, maxWidth: 360, aspectRatio: "9/16" }}>
            <PlanogramCanvas
              shelfCount={shelfCount}
              title={title}
              bgFrom={planogram.bgFrom}
              bgTo={planogram.bgTo}
            />
          </div>
        </div>

        {/* 우측 설정 패널 */}
        <div className="w-72 flex-shrink-0 bg-sidebar-bg border-l border-white/10 flex flex-col overflow-hidden">
          {/* 탭 헤더 */}
          <div className="flex border-b border-white/10">
            {TAB_CONFIG.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={clsx(
                  "flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors border-b-2",
                  tab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                )}>
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
          {/* 탭 콘텐츠 */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {tab === "media"    && <MediaPanel />}
            {tab === "design"   && <DesignPanel title={title} setTitle={setTitle} />}
            {tab === "shelves"  && <ShelvesPanel shelfCount={shelfCount} setShelfCount={setShelfCount} />}
            {tab === "products" && <ProductsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
