import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss'],
})
export class RecommendedComponent implements OnInit {
  products$ = this.productsService.products$;
  loading$ = this.productsService.loading$;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts();
  }

  onAddToCart(id: number) {
    this.productsService.addToCart(id);
  }
}
