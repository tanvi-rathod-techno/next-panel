"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import Badge from "../ui/badge/Badge";
import Pagination from "../tables/Pagination";
import { fetchProducts } from "@/lib/api/products";

import {Product} from "@/types/product"

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const pageSize = 10;
  const totalPages = useMemo(
    () => Math.ceil(totalProducts / pageSize),
    [totalProducts]
  );

  const fetchProductData = async (page: number) => {
    try {
      const data = await fetchProducts(page, pageSize);
      setProducts(data.products);
      setTotalProducts(data.total);
  
      if (data.total && page > Math.ceil(data.total / pageSize)) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  
  useEffect(() => {
    fetchProductData(currentPage);
  }, [currentPage]);
  
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-start text-sm font-medium text-gray-500 dark:text-gray-400">Product</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-sm font-medium text-gray-500 dark:text-gray-400">Title</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-sm font-medium text-gray-500 dark:text-gray-400">Category</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-sm font-medium text-gray-500 dark:text-gray-400">Price</TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-sm font-medium text-gray-500 dark:text-gray-400">Rating</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div className="w-15 h-15 overflow-hidden rounded-xl border">
                        <Image
                          width={76}
                          height={76}
                          src={product.thumbnail}
                          alt={product.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-700 dark:text-white/90">
                      {product.title}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 dark:text-gray-400">
                      {product.category}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 dark:text-gray-400">
                      ${product.price}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          product.rating >= 4.5
                            ? "success"
                            : product.rating >= 3
                            ? "warning"
                            : "error"
                        }
                      >
                        {product.rating}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
