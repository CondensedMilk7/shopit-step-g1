export interface Product {
  id: number;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
}

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
