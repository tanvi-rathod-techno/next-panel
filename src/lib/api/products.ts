import { ProductResponse } from "@/types/product";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(page: number = 1, pageSize: number = 10): Promise<ProductResponse> {
  const skip = (page - 1) * pageSize;
  const res = await fetch(`${BASE_URL}/products?limit=${pageSize}&skip=${skip}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

export async function fetchTotalProducts(): Promise<number> {
  const res = await fetch(`${BASE_URL}/products?limit=1`);

  if (!res.ok) {
    throw new Error("Failed to fetch total product count");
  }

  const data = await res.json();
  return data.total; // returns total number of products
}
