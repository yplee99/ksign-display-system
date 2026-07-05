"use client";
import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";

type Tab = "prices" | "popup" | "effects" | "barcodes" | "screen";

const TABS: { key: Tab; label: string }[] = [
  { key: "prices",   label: "Prices" },
  { key: "popup",    label: "Product Pop-Up" },
  { key: "effects",  label: "Vmotion Effects" },
  { key: "barcodes", label: "Product Barcodes" },
  { key: "screen",   label: "Vmotion Screen" },
];

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center gap-3 cursor-pointer py-1">
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="accent-primary" />
      <span className="text-[13px] text-gray-700">{label}</span>
    </label>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("prices");
  const [priceTagSize, setPriceTagSize] = useState<"small" | "medium" | "large">("medium");
  const [stockDisplay, setStockDisplay] = useState<"numbers" | "indicators" | "hide">("indicators");

  return (
    <div className="p-6">
      <PageHeader title="Vmotion Settings" subtitle="Here you can view and manage all Vmotion settings and properties." />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* 탭 */}
        <div className="flex border-b border-gray-200 px-4 pt-3 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-w-2xl space-y-6">
          {/* Prices 탭 */}
          {tab === "prices" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Toggle label="Disable prices in planograms and pop-up products." />
                <Toggle label="Display price tags in planograms." defaultChecked />
                <Toggle label="Display promotion tags on products." defaultChecked />
                <Toggle label="Show base price on price tags" />
              </div>
              <div>
                <label className="text-[13px] font-medium text-gray-700 block mb-1">Reference price</label>
                <select className="border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-primary w-56">
                  <option>Always use RRP</option>
                  <option>Always use own price</option>
                  <option>Prefer RRP</option>
                  <option>Prefer own price</option>
                </select>
                <p className="text-[11px] text-gray-400 mt-1">Reference price to calculate the price savings calculation.</p>
              </div>
              <div>
                <p className="text-[13px] font-medium text-gray-700 mb-3">Price tag size</p>
                <div className="flex gap-4">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <label key={size} className="flex flex-col items-center gap-2 cursor-pointer">
                      <div className={`w-24 h-16 rounded-lg border-2 flex items-end justify-center pb-2 transition-colors ${
                        priceTagSize === size ? "border-primary bg-primary-light" : "border-gray-200"}`}>
                        <span className="text-[9px] text-gray-600 bg-white px-1 py-0.5 rounded shadow-sm">13,56 €</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="radio" name="priceTagSize" checked={priceTagSize === size}
                          onChange={() => setPriceTagSize(size)} className="accent-primary" />
                        <span className="text-[12px] text-gray-600 capitalize">{size}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Pop-Up 탭 */}
          {tab === "popup" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                  <input type="checkbox" className="accent-primary" defaultChecked />
                  Close product pop-up window automatically after
                </label>
                <input type="number" defaultValue={15} className="border border-gray-200 rounded px-2 py-1 w-16 text-[13px] focus:outline-none focus:border-primary" />
                <span className="text-[13px] text-gray-500">Seconds</span>
              </div>
              <Toggle label="Display product recommendations and alternative products" defaultChecked />
              <Toggle label="BD rowa cross-selling product information" defaultChecked />
              <div>
                <p className="text-[13px] font-medium text-gray-700 mb-3">Stock information</p>
                <div className="flex gap-4">
                  {(["numbers", "indicators", "hide"] as const).map((opt) => (
                    <label key={opt} className="flex flex-col items-center gap-2 cursor-pointer">
                      <div className={`w-24 h-16 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        stockDisplay === opt ? "border-primary bg-primary-light" : "border-gray-200"}`}>
                        <span className="text-[10px] text-gray-500 capitalize">{opt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <input type="radio" name="stock" checked={stockDisplay === opt}
                          onChange={() => setStockDisplay(opt)} className="accent-primary" />
                        <span className="text-[12px] text-gray-600 capitalize">
                          {opt === "numbers" ? "Stock as numbers" : opt === "indicators" ? "Stock as indicators" : "Hide Stock"}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Vmotion Effects 탭 */}
          {tab === "effects" && (
            <div>
              <p className="text-[13px] text-gray-500 mb-4">Select the visual transition effect applied to all screens.</p>
              <div className="grid grid-cols-2 gap-3">
                {["No Effect", "Snow", "Rain", "Sparkle", "Confetti", "Slide"].map((effect) => (
                  <label key={effect} className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="effect" className="accent-primary" defaultChecked={effect === "No Effect"} />
                    <span className="text-[13px] text-gray-700">{effect}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Barcodes 탭 */}
          {tab === "barcodes" && (
            <div className="space-y-2">
              <Toggle label="Enable multiple barcodes" defaultChecked />
              <Toggle label="Use code mapping for dispensing" defaultChecked />
              <Toggle label="Use code mapping for price import" defaultChecked />
            </div>
          )}

          {/* Vmotion Screen 탭 */}
          {tab === "screen" && (
            <div>
              <p className="text-[13px] text-gray-500 mb-4">Your Vmotion screens can be switched on and off automatically. Times can be set individually for each screen.</p>
              <div className="space-y-3">
                {["Pharmacy Entry", "Screen 11", "Screen 3", "Screen 4", "Screen 5"].map((screen) => (
                  <div key={screen} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-medium text-gray-800">{screen}</span>
                      <label className="flex items-center gap-2 text-[12px] text-gray-500 cursor-pointer">
                        <input type="checkbox" className="accent-primary" />
                        Auto timer
                      </label>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-[11px] text-gray-400">
                      {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => (
                        <div key={d} className="text-center">{d}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 저장 버튼 */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button className="bg-primary text-white text-[13px] font-medium px-6 py-2 rounded-full hover:bg-primary-hover transition-colors flex items-center gap-1.5">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
