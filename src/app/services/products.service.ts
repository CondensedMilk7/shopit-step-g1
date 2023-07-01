import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetProductsResponse, Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';
import { Cart, GetCartResponse } from '../types/cart';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  baseUrl = 'https://dummyjson.com';
  products: Product[] = [];

  products$ = new BehaviorSubject<Product[]>([]);
  cart$ = new BehaviorSubject<Cart>({
    userId: 0,
    discountedTotal: 0,
    id: 0,
    products: [],
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
  });
  loading$ = new BehaviorSubject<boolean>(false);

  private cartProducts = PRODUCTS.splice(0, 2);

  constructor(private router: Router, private http: HttpClient) {}

  getProducts() {
    this.loading$.next(true);
    this.http
      .get<GetProductsResponse>(`${this.baseUrl}/products`)
      .subscribe((response) => {
        this.products$.next(response.products);
        this.loading$.next(false);
      });
  }

  searchProducts(query: string) {
    this.loading$.next(true);
    this.http
      .get<GetProductsResponse>(`${this.baseUrl}/products/search`, {
        params: {
          q: query,
        },
      })
      .subscribe((response) => {
        this.products$.next(response.products);
        this.loading$.next(false);
      });
  }

  deleteProduct(id: number) {}

  getCart() {
    this.loading$.next(true);
    this.http
      .get<GetCartResponse>(`${this.baseUrl}/carts/user/5`)
      .subscribe((response) => {
        this.cart$.next(response.carts[0]);
        this.loading$.next(false);
      });
  }

  deleteFromCart(id: number) {
    this.cartProducts = this.cartProducts.filter(
      (product) => product.id !== id
    );
  }

  addToCart(id: number) {
    const productToAdd = this.products.find((p) => p.id === id);
    if (productToAdd) {
      this.cartProducts.push(productToAdd);
      this.router.navigate(['cart'], { fragment: `${id}` });
    } else {
      throw new Error(`Could not add product to cart. ID: ${id}`);
    }
  }

  getRecommended() {
    const randomIndex = Math.floor(Math.random() * this.products.length);
    return [this.products[randomIndex]];
  }

  getProductById(id: number) {
    return this.products.find((p) => p.id === id) || null;
  }
}
