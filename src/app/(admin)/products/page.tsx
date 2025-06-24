// src/app/(admin)/products/page.tsx
"use client";
import ProductTable from "@/components/tables/ProductTable";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <ProductTable />
    </div>
  );
}
