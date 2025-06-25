// components/tables/ProductTable.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "./DataTable";
import Pagination from "../tables/Pagination";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/types/product";
import { productColumns } from "./columns/productColumns";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // page-size selector

  const totalPages = useMemo(
    () => Math.ceil(totalProducts / pageSize),
    [totalProducts, pageSize]
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProducts(currentPage, pageSize);
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    })();
  }, [currentPage, pageSize]);



  /* ---------------------------- UI Render ------------------------------ */
  return (
    <div className="space-y-4">

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white dark:border-white/10 dark:bg-white/5">
            <DataTable
              columns={productColumns}
              data={products}
              pageSize={pageSize}
              onPageSizeChange={(size) => {
                setCurrentPage(1);
                setPageSize(size);
              }}
            />

          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => p >= 1 && p <= totalPages && setCurrentPage(p)}
          />
        </div>
      )}
    </div>
  );
}
