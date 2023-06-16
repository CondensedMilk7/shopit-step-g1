import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products = PRODUCTS;
  private cartProducts = PRODUCTS.splice(0, 2);

  getProducts() {
    return this.products;
  }

  deleteProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  getCart() {
    return this.cartProducts;
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
    } else {
      throw new Error(`Could not add product to cart. ID: ${id}`);
    }
  }
}
