import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart$ = this.productsService.cart$;
  loading$ = this.productsService.loading$;
  productLoading$ = this.productsService.productLoading$;

  constructor(private productsService: ProductsService) {}

  onDeleteProduct(cartId: number, productId: number) {
    this.productsService.deleteFromCart(cartId, productId);
  }
}
