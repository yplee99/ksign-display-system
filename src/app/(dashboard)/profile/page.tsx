"use client";
import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";

const LANGUAGES = ["English (English)", "Deutsch (German)", "Français (French)", "한국어 (Korean)", "日本語 (Japanese)"];
const REGIONS   = ["Austria", "Germany", "France", "South Korea", "Japan", "United States"];

function SectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-8 py-6 border-b border-gray-100 last:border-0">
      <div className="w-44 flex-shrink-0">
        <p className="text-[13px] font-medium text-gray-700">{label}</p>
      </div>
      <div className="flex-1 space-y-4">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  const [fullName, setFullName]   = useState("Alexander Windeck");
  const [language, setLanguage]   = useState(LANGUAGES[0]);
  const [region, setRegion]       = useState(REGIONS[0]);

  return (
    <div className="p-6">
      <PageHeader
        title="Profile Details"
        subtitle="Here you can view and edit your Vmotion Cloud profile."
      />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Profile Details */}
        <SectionRow label="Profile Details">
          <div>
            <label className="text-[12px] text-gray-500 block mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full max-w-sm border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[12px] text-gray-500 block mb-1">E-Mail</label>
            <p className="text-[13px] text-gray-400 select-none">alexander.windeck@bd.com</p>
          </div>
        </SectionRow>

        {/* Preferences */}
        <SectionRow label="Preferences">
          <div>
            <label className="text-[12px] text-gray-500 block mb-1">
              Language <span className="text-red-400">*</span>
            </label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}
              className="w-full max-w-sm border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-primary">
              {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
            </select>
            <p className="text-[11px] text-gray-400 mt-1">Display language for your Vmotion Cloud account.</p>
          </div>
          <div>
            <label className="text-[12px] text-gray-500 block mb-1">
              Region <span className="text-red-400">*</span>
            </label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}
              className="w-full max-w-sm border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-primary">
              {REGIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
            <p className="text-[11px] text-gray-400 mt-1">Formats used for displaying date and time in the Vmotion Cloud.</p>
          </div>
        </SectionRow>

        {/* Password */}
        <SectionRow label="Password">
          <div>
            <p className="text-[12px] text-gray-500 mb-1">Password</p>
            <Link href="/forgot-password"
              className="text-[13px] text-primary hover:underline">
              Change password
            </Link>
            <p className="text-[11px] text-gray-400 mt-0.5">You will be redirected to change your password.</p>
          </div>
        </SectionRow>

        {/* About */}
        <SectionRow label="About Vmotion Cloud">
          <div className="space-y-2 text-[13px]">
            <div>
              <p className="font-semibold text-gray-700">Front End Version:</p>
              <p className="text-gray-500">1.0.0-alpha</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Back End Version:</p>
              <p className="text-gray-500">—</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Release Notes</p>
            </div>
          </div>
        </SectionRow>

        {/* Save */}
        <div className="flex justify-end mt-4">
          <button className="bg-primary text-white text-[13px] font-medium px-6 py-2 rounded-full hover:bg-primary-hover transition-colors flex items-center gap-1.5">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
