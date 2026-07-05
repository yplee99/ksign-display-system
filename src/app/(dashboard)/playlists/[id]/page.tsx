"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, X, Search, Plus, GripVertical } from "lucide-react";
import { PLAYLISTS } from "@/data/dummy/playlists";
import { PLANOGRAMS } from "@/data/dummy/planograms";

const SCREENS = ["Screen 1", "Screen 2", "Screen 3", "Screen 4", "Screen 5", "Screen 6", "Test"];
const ROTATION_OPTIONS = ["10 Sec.", "15 Sec.", "20 Sec.", "25 Sec.", "30 Sec.", "45 Sec.", "60 Sec.", "2 Min.", "5 Min.", "10 Min."];

export default function PlaylistDetailPage({ params }: { params: { id: string } }) {
  const playlist = PLAYLISTS.find((p) => p.id === Number(params.id)) ?? PLAYLISTS[0];
  const [name, setName] = useState(playlist.name);
  const [search, setSearch] = useState("");
  const [rotations, setRotations] = useState<Record<string, string>>(
    Object.fromEntries(SCREENS.map((s) => [s, "15 Sec."]))
  );
  const [screenItems, setScreenItems] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {};
    SCREENS.forEach((s, i) => {
      init[s] = PLANOGRAMS.slice(i % 3, (i % 3) + 2).map((p) => p.id);
    });
    return init;
  });

  const filteredPlanos = PLANOGRAMS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToScreen = (screen: string, planoId: number) => {
    setScreenItems((prev) => ({ ...prev, [screen]: [...(prev[screen] ?? []), planoId] }));
  };

  const removeFromScreen = (screen: string, idx: number) => {
    setScreenItems((prev) => ({ ...prev, [screen]: prev[screen].filter((_, i) => i !== idx) }));
  };

  return (
    <div className="p-6 h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      {/* 브레드크럼 + 이름 편집 */}
      <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-3 flex-shrink-0">
        <Link href="/playlists" className="hover:text-primary">Playlists</Link>
        <ChevronRight size={14} />
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="text-primary font-medium bg-transparent border-b border-dashed border-primary focus:outline-none min-w-0" />
      </div>

      <div className="flex gap-4 flex-1 overflow-hidden">
        {/* 스크린 슬롯 (가로 스크롤) */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <div className="flex h-full min-w-max">
              {SCREENS.map((screen) => (
                <div key={screen} className="w-44 flex-shrink-0 border-r border-gray-100 flex flex-col">
                  {/* 스크린 헤더 */}
                  <div className="px-3 py-2 border-b border-gray-100 flex-shrink-0 bg-gray-50">
                    <p className="text-[12px] font-semibold text-gray-700 mb-1">{screen}</p>
                    <select value={rotations[screen]}
                      onChange={(e) => setRotations((prev) => ({ ...prev, [screen]: e.target.value }))}
                      className="w-full text-[11px] border border-gray-200 rounded px-1 py-0.5 bg-white focus:outline-none focus:border-primary text-gray-600">
                      {ROTATION_OPTIONS.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                  {/* 플래노그램 카드 */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0">
                    {(screenItems[screen] ?? []).map((planoId, idx) => {
                      const plano = PLANOGRAMS.find((p) => p.id === planoId);
                      if (!plano) return null;
                      return (
                        <div key={idx} className="relative rounded overflow-hidden border border-gray-200 group cursor-grab hover:border-primary transition-colors">
                          <div className="h-20 w-full flex items-end px-2 pb-1"
                            style={{ background: `linear-gradient(160deg, ${plano.bgFrom}, ${plano.bgTo})` }}>
                            <p className="text-white text-[9px] font-medium truncate w-full">{plano.name}</p>
                          </div>
                          <div className="px-2 py-1 flex items-center justify-between bg-white">
                            <p className="text-[10px] text-gray-400 truncate">{plano.author}</p>
                            <button onClick={() => removeFromScreen(screen, idx)}
                              className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              <X size={11} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => addToScreen(screen, PLANOGRAMS[Math.floor(Math.random() * PLANOGRAMS.length)].id)}
                      className="w-full border-2 border-dashed border-gray-200 rounded py-2 text-[11px] text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1">
                      <Plus size={12} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 플래노그램 컬렉션 패널 */}
        <div className="w-52 flex-shrink-0 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="p-2 border-b border-gray-100 flex-shrink-0">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..." className="w-full pl-7 pr-2 py-1.5 text-[12px] border border-gray-200 rounded focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 min-h-0">
            {filteredPlanos.map((p) => (
              <div key={p.id} draggable
                className="flex items-center gap-2 rounded border border-gray-100 overflow-hidden hover:border-primary cursor-grab group transition-colors">
                <div className="w-9 h-12 flex-shrink-0"
                  style={{ background: `linear-gradient(160deg, ${p.bgFrom}, ${p.bgTo})` }} />
                <div className="flex-1 min-w-0 py-1">
                  <p className="text-[11px] text-gray-800 font-medium truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.author}</p>
                </div>
                <GripVertical size={12} className="text-gray-300 mr-1 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="flex justify-end gap-2 mt-3 flex-shrink-0">
        <Link href="/playlists"
          className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 px-3 py-1.5">
          <X size={14} /> Cancel
        </Link>
        <button className="bg-primary text-white text-[13px] font-medium px-5 py-1.5 rounded-full hover:bg-primary-hover transition-colors">
          Save
        </button>
      </div>
    </div>
  );
}
