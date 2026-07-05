"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import { ORGANIZATIONS } from "@/data/dummy/organizations";
type Tab = "pharmacy" | "chain" | "sharing";
export default function OrganizationsPage() {
  const [tab, setTab] = useState<Tab>("pharmacy");
  const [search, setSearch] = useState("");
  const filtered = ORGANIZATIONS.filter(
    (o) => o.name.toLowerCase().includes(search.toLowerCase()) ||
           o.customerId.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6">
      <PageHeader title="Organizations" subtitle="Here you can view and manage different organizations." />
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-3 pb-0 border-b border-gray-200">
          <div className="flex">
            {(["pharmacy", "chain", "sharing"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors ${
                  tab === t ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t === "pharmacy" ? "Pharmacy" : t === "chain" ? "Pharmacy Chain" : "Content Sharing"}
              </button>
            ))}
          </div>
          <SearchInput placeholder="Search..." containerClassName="w-52 mb-1"
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[700px]">
            <thead><tr className="text-[11px] text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="text-left px-4 py-3 font-medium">Customer ID</th>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Subtype</th>
              <th className="text-left px-4 py-3 font-medium">Screens</th>
              <th className="text-left px-4 py-3 font-medium">Devices</th>
              <th className="text-right px-4 py-3 font-medium"></th>
            </tr></thead>
            <tbody>{filtered.map((org) => (
              <tr key={org.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500 font-mono text-[12px]">{org.customerId}</td>
                <td className="px-4 py-3">
                  <p className="text-gray-900 font-medium">{org.name}</p>
                  <p className="text-gray-400 text-[11px]">{org.address}</p>
                </td>
                <td className="px-4 py-3 text-gray-500">{org.subtype}</td>
                <td className="px-4 py-3 text-gray-500">{org.screens > 0 ? org.screens + " Screens" : "-"}</td>
                <td className="px-4 py-3 text-gray-500">
                  {org.devices > 0
                    ? <button className="flex items-center gap-1 hover:text-gray-700">{org.devices} Devices <ChevronDown size={12} /></button>
                    : "-"}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-primary hover:text-primary-hover text-[12px] font-medium">Switch to</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
