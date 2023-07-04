import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetProductsResponse, Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartProduct, GetCartResponse } from '../types/cart';

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
  productLoading$ = new BehaviorSubject<number | null>(null);

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

  deleteFromCart(cartId: number, toDeleteId: number) {
    this.productLoading$.next(toDeleteId);
    const products = this.cart$.value.products;
    const filteredProducts = products.filter((p) => p.id !== toDeleteId);
    const payload = { merge: false, products: filteredProducts };
    this.http
      .put<Cart>(`${this.baseUrl}/carts/${cartId}`, payload)
      .subscribe((updatedCart) => {
        this.cart$.next(updatedCart);
        this.productLoading$.next(null);
      });
  }

  getCart() {
    this.loading$.next(true);
    this.http
      .get<GetCartResponse>(`${this.baseUrl}/carts/user/5`)
      .subscribe((response) => {
        this.cart$.next(response.carts[0]);
        this.loading$.next(false);
      });
  }

  addToCart(id: number, quantity: number = 1) {
    this.productLoading$.next(id);

    const product = { id, quantity };
    const payload = {
      merge: false,
      products: [...this.cart$.value.products, product],
    };

    this.http
      .put<Cart>(`${this.baseUrl}/carts/19`, payload)
      .subscribe((updatedCart) => {
        this.cart$.next(updatedCart);
        this.productLoading$.next(null);
        this.router.navigate(['/cart']);
      });
  }

  addProduct(product: Partial<Product>) {
    this.http
      .post<Product>(`${this.baseUrl}/products/add`, product)
      .subscribe((product) => {
        console.log(product);
        this.products$.next([...this.products$.value, product]);
      });
  }

  updateProduct(id: number, product: Partial<Product>) {
    this.http
      .put<Product>(`${this.baseUrl}/products/${id}`, product)
      .subscribe((product) => {
        console.log(product);
      });
  }

  getRecommended() {
    const randomIndex = Math.floor(Math.random() * this.products.length);
    return [this.products[randomIndex]];
  }

  getProductById(id: number) {
    return this.products.find((p) => p.id === id) || null;
  }
}
