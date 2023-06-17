import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const productId = paramMap.get('productId');

      if (productId) {
        this.product = this.productsService.getProductById(Number(productId));
      }
    });
  }
}
