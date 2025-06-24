import { Product } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetches a paginated list of products.
 * @param page - The current page number.
 * @param pageSize - The number of products per page.
 * @returns A promise resolving to the product data.
 */
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
