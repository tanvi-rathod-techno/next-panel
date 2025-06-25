export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
}


export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
