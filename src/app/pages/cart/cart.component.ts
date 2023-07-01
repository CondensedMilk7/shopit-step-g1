import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart$ = this.productsService.cart$;
  loading$ = this.productsService.loading$;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getCart();
  }

  onDeleteProduct(id: number) {
    // this.productsService.deleteFromCart(id);
    // this.products = this.productsService.getCart();
  }
}
