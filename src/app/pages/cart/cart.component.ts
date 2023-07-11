import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  private cart$ = this.productsService.cart;
  private loading$ = this.productsService.loading;
  private productLoading$ = this.productsService.productLoading;

  vm$ = combineLatest([this.cart$, this.loading$, this.productLoading$]).pipe(
    map(([cart, loading, productLoading]) => ({
      cart,
      loading,
      productLoading,
    }))
  );

  constructor(private productsService: ProductsService) {}

  onDeleteProduct(cartId: number, productId: number) {
    this.productsService.deleteFromCart(cartId, productId);
  }
}
