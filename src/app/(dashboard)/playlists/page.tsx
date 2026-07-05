"use client";
import { useState } from "react";
import Link from "next/link"; import { Copy, Trash2, Plus } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";
import { PLAYLISTS, SHARED_TEMPLATES } from "@/data/dummy/playlists";
type Tab = "playlists" | "shared";
export default function PlaylistsPage() {
  const [tab, setTab] = useState<Tab>("playlists");
  const [search, setSearch] = useState("");
  const filtered = PLAYLISTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-6">
      <PageHeader title="Playlists" subtitle="Here you can view and manage all playlists."
        action={<Button icon={<Plus size={14} />}>New playlist</Button>} />
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-3 pb-0 border-b border-gray-200">
          <div className="flex">
            {(["playlists", "shared"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${
                  tab === t ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t === "playlists" ? "Playlists" : "Shared Templates"}
              </button>
            ))}
          </div>
          {tab === "playlists" && (
            <SearchInput placeholder="Search..." containerClassName="w-48 mb-1"
              value={search} onChange={(e) => setSearch(e.target.value)} />
          )}
        </div>
        {tab === "playlists" ? (
          <table className="w-full text-[13px]">
            <thead><tr className="text-[11px] text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Used in</th>
              <th className="text-left px-4 py-3 font-medium">Created on</th>
              <th className="text-center px-4 py-3 font-medium w-16">Copy</th>
              <th className="text-center px-4 py-3 font-medium w-16">Delete</th>
            </tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No playlists found</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><Link href={"/playlists/" + p.id} className="text-primary hover:underline">{p.name}</Link></td>
                  <td className="px-4 py-3 text-gray-500">{p.usedIn ? p.usedIn + " ▾" : "-"}</td>
                  <td className="px-4 py-3 text-gray-500">{p.createdAt}</td>
                  <td className="px-4 py-3 text-center"><button className="text-gray-400 hover:text-gray-700"><Copy size={14} /></button></td>
                  <td className="px-4 py-3 text-center"><button className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-[13px]">
            <thead><tr className="text-[11px] text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Shared By</th>
              <th className="text-left px-4 py-3 font-medium">Slots</th>
              <th className="text-left px-4 py-3 font-medium">Created on</th>
              <th className="text-center px-4 py-3 font-medium w-20">Import</th>
            </tr></thead>
            <tbody>{SHARED_TEMPLATES.map((t) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{t.name}</td>
                <td className="px-4 py-3 text-gray-500">{t.sharedBy}</td>
                <td className="px-4 py-3 text-gray-500">{t.slots} Slot(s)</td>
                <td className="px-4 py-3 text-gray-500">{t.createdAt}</td>
                <td className="px-4 py-3 text-center"><button className="text-primary hover:text-primary-hover"><Copy size={14} /></button></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

