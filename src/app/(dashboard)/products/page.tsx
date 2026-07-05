"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { PRODUCTS } from "@/data/dummy/products";
import clsx from "clsx";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search)
  );
  return (
    <div className="p-6">
      <PageHeader title="Products" subtitle="Here you can view and edit all products."
        action={
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search products..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-3 py-1.5 text-[12px] border border-gray-200 rounded-md focus:outline-none focus:border-primary w-48" />
          </div>
        } />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[800px]">
            <thead>
              <tr className="text-[11px] text-gray-400 uppercase tracking-wide border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium">Product Name</th>
                <th className="text-left px-4 py-3 font-medium">Product Code</th>
                <th className="text-left px-4 py-3 font-medium">Manufacturer</th>
                <th className="text-left px-4 py-3 font-medium">Dosage Form</th>
                <th className="text-left px-4 py-3 font-medium">Pack Size</th>
                <th className="text-right px-4 py-3 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5">
                    <Link href={"/products/" + product.id}
                      className={clsx("hover:underline", product.discontinued ? "line-through text-gray-400" : "text-primary")}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 font-mono text-[12px]">{product.code}</td>
                  <td className="px-4 py-2.5 text-gray-500">{product.manufacturer}</td>
                  <td className="px-4 py-2.5 text-gray-500">{product.dosageForm}</td>
                  <td className="px-4 py-2.5 text-gray-500">{product.packSize}</td>
                  <td className="px-4 py-2.5 text-right text-gray-900 font-medium">
                    {product.price !== null ? "€ " + product.price.toFixed(2) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
