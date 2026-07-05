"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { PRODUCTS } from "@/data/dummy/products";

type Tab = "properties" | "recommendations" | "alternatives" | "variants";

const TABS: { key: Tab; label: string }[] = [
  { key: "properties",      label: "Product properties" },
  { key: "recommendations", label: "Product recommendations" },
  { key: "alternatives",    label: "Alternative products" },
  { key: "variants",        label: "Product variants" },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState<Tab>("properties");
  const [priceType, setPriceType] = useState<"rrp" | "own" | "promo">("rrp");

  const product = PRODUCTS.find((p) => p.id === Number(params.id)) ?? PRODUCTS[0];

  return (
    <div className="p-6">
      {/* 브레드크럼 */}
      <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-4">
        <Link href="/products" className="hover:text-primary">Products</Link>
        <ChevronRight size={14} />
        <span className="text-primary">{product.name}</span>
      </div>

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

        <div className="p-6">
          {/* 제품 속성 탭 */}
          {tab === "properties" && (
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 mb-5">{product.name}</h2>
              <div className="flex gap-8 mb-6">
                {/* 제품 이미지 */}
                <div className="w-36 h-44 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                  <span className="text-gray-300 text-[11px] text-center px-2">Product Image</span>
                </div>
                {/* 메타데이터 */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-3 flex-1 text-[13px]">
                  {[
                    ["Product code", product.code],
                    ["Manufacturer", product.manufacturer],
                    ["Pack size", product.packSize],
                    ["Product Group", "ABDA Produkte22"],
                    ["Pharmacy only", "No"],
                    ["Dosage form", product.dosageForm],
                    ["Last updated", "20 October 2025"],
                    ["Last imported", "18 October 2025"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
                      <p className="text-gray-800">{value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-[11px] text-gray-400 mb-0.5">Product Issue</p>
                    <button className="text-primary hover:underline text-[13px]">Report Issue</button>
                  </div>
                </div>
              </div>

              {/* 가격 */}
              <div>
                <h3 className="text-[13px] font-semibold text-gray-700 mb-1">Prices</h3>
                <p className="text-[12px] text-gray-400 mb-3">Select and edit the price to be displayed on Vmotion.</p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 mb-3 flex items-center gap-2">
                  <span className="text-blue-500 text-lg">ℹ</span>
                  <p className="text-[12px] text-blue-600">
                    These Prices won&apos;t be shown on the Vmotion. Instead, prices from your PIS System are used.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
                  {[
                    { key: "rrp"   as const, label: "RRP",             sub: "Manufacturer's RRP", showPrice: true  },
                    { key: "own"   as const, label: "Own price",        sub: "",                   showPrice: false },
                    { key: "promo" as const, label: "Promotion price",  sub: "",                   showPrice: false },
                  ].map((opt) => (
                    <label key={opt.key}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${priceType === opt.key ? "bg-gray-50" : ""}`}>
                      <input type="radio" name="priceType" checked={priceType === opt.key}
                        onChange={() => setPriceType(opt.key)} className="accent-primary" />
                      <div className="flex-1">
                        <p className="text-[13px] text-gray-800">{opt.label}</p>
                        {opt.sub && <p className="text-[11px] text-gray-400">{opt.sub}</p>}
                      </div>
                      {opt.showPrice && product.price !== null && (
                        <span className="text-[13px] text-gray-900 font-medium">
                          {"€ " + product.price.toFixed(2)}
                        </span>
                      )}
                      {!opt.showPrice && (
                        <input type="text" placeholder="Enter price"
                          className="border border-gray-200 rounded px-2 py-1 text-[12px] w-28 focus:outline-none focus:border-primary" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 px-3 py-1.5">
                  <X size={14} /> Cancel
                </button>
                <button className="bg-primary text-white text-[13px] font-medium px-5 py-1.5 rounded-full hover:bg-primary-hover transition-colors">
                  Save
                </button>
              </div>
            </div>
          )}

          {/* 추천/대안 제품 탭 */}
          {(tab === "recommendations" || tab === "alternatives") && (
            <div className="flex gap-6 min-h-[300px]">
              <div className="w-1/2 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-300 text-[13px]">
                Drag products here
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-[12px] text-gray-400 uppercase tracking-wide mb-3">Product collection</p>
                {PRODUCTS.slice(0, 6).map((p) => (
                  <div key={p.id}
                    className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-grab">
                    <div className="w-8 h-10 rounded bg-gray-100 flex-shrink-0" />
                    <div>
                      <p className="text-[12px] text-gray-800 font-medium">{p.name}</p>
                      <p className="text-[11px] text-gray-400">
                        {p.packSize} · {p.price !== null ? "€ " + p.price.toFixed(2) : "-"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 제품 변형 탭 */}
          {tab === "variants" && (
            <div className="space-y-2">
              {["10 ml", "20 ml", "50 ml"].map((size) => (
                <div key={size}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                  <div>
                    <p className="text-[13px] text-gray-800 font-medium">{product.name} – {size}</p>
                    <p className="text-[11px] text-gray-400">{product.manufacturer} · {size}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
