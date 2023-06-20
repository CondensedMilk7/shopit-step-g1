import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.route.queryParamMap.subscribe((paramMap) => {
      const search = paramMap.get('search');
      if (search) {
        this.productSearchText = search;
      }
    });
  }

  onAddToCart(id: number) {
    this.productsService.addToCart(id);
  }
}
