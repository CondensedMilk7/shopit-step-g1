import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetProductsResponse, Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';
import { Cart, GetCartResponse } from '../types/cart';
import { ENVIRONMENT } from 'src/environment/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  baseUrl = ENVIRONMENT.baseUrl;

  private products$ = new BehaviorSubject<Product[]>([]);
  private cart$ = new BehaviorSubject<Cart>({
    userId: 0,
    discountedTotal: 0,
    id: 0,
    products: [],
    total: 0,
    totalProducts: 0,
    totalQuantity: 0,
  });
  private loading$ = new BehaviorSubject<boolean>(false);
  private productLoading$ = new BehaviorSubject<number | null>(null);

  get products() {
    return this.products$.asObservable();
  }

  get cart() {
    return this.cart$.asObservable();
  }

  get loading() {
    return this.loading$.asObservable();
  }

  get productLoading() {
    return this.productLoading$.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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
    if (this.authService.isAuthenticated()) {
      this.loading$.next(true);
      const userId = this.authService.getUserId();
      const token = this.authService.getToken();

      this.http
        .get<GetCartResponse>(`${this.baseUrl}/auth/carts/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .subscribe((response) => {
          this.cart$.next(response.carts[0]);
          this.loading$.next(false);
        });
    }
  }

  addToCart(id: number, quantity: number = 1) {
    this.productLoading$.next(id);

    const product = { id, quantity };
    const payload = {
      merge: false,
      products: [...this.cart$.value.products, product],
    };
    const cartId = this.cart$.value.id;

    this.http
      .put<Cart>(`${this.baseUrl}/auth/carts/${cartId}`, payload)
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

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}
