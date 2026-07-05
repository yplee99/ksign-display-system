"use client";
import { Trash2, Plus } from "lucide-react";
import clsx from "clsx";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import { SCHEDULES } from "@/data/dummy/schedules";
const STATUS_STYLE: Record<string, string> = {
  Active: "text-gray-900", Running: "text-primary font-medium",
  Planned: "text-gray-400", Expired: "text-red-400",
};
export default function SchedulePage() {
  return (
    <div className="p-6">
      <PageHeader title="Schedule" subtitle="Here you can view and manage all schedules."
        action={<Button icon={<Plus size={14} />}>New schedule</Button>} />
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead><tr className="text-[11px] text-gray-400 uppercase tracking-wide border-b border-gray-200">
            <th className="text-left px-4 py-3 font-medium">Name</th>
            <th className="text-left px-4 py-3 font-medium">Status</th>
            <th className="text-left px-4 py-3 font-medium">Valid from</th>
            <th className="text-left px-4 py-3 font-medium">Valid until</th>
            <th className="text-center px-4 py-3 font-medium w-16">Delete</th>
          </tr></thead>
          <tbody>{SCHEDULES.map((s) => (
            <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3"><span className="text-primary hover:underline cursor-pointer">{s.name}</span></td>
              <td className={clsx("px-4 py-3", STATUS_STYLE[s.status])}>{s.status}</td>
              <td className="px-4 py-3 text-gray-500">{s.validFrom}</td>
              <td className="px-4 py-3 text-gray-500">{s.validUntil}</td>
              <td className="px-4 py-3 text-center">
                <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
