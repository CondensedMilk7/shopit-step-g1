import { Product } from './product';

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface GetCartResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartProduct {}
