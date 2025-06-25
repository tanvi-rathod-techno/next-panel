// components/tables/columns/productColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import Image from "next/image";
import Badge from "@/components/ui/badge/Badge";

export const productColumns: ColumnDef<Product>[] = [
  {
    id: "thumbnail",
    header: "Product",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="w-[76px] h-[76px] overflow-hidden rounded-xl border">
        <Image
          src={row.original.thumbnail}
          alt={row.original.title}
          width={60}
          height={60}
          className="object-cover w-full h-full"
        />
      </div>
    ),
  },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "brand", header: "Brand" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => (
      <div className="font-medium text-gray-800">
        ${getValue<number>().toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ getValue }) => {
      const rating = getValue<number>();
      return (
        <div className="flex justify-center">
          <Badge
            size="sm"
            color={rating >= 4.5 ? "success" : rating >= 3 ? "warning" : "error"}
          >
            {rating.toFixed(2)}
          </Badge>
        </div>
      );
    },
  },

];
