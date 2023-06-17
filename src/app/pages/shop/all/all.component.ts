import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  products!: Product[];
  productSearchText = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onAddToCart(id: number) {
    this.productsService.addToCart(id);
  }
}
