import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest, map, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  products$ = this.productsService.products;
  loading$ = this.productsService.loading;
  productLoading$ = this.productsService.productLoading;

  queryParams$ = this.route.queryParamMap.pipe(
    tap((paramMap) => {
      const search = paramMap.get('search');
      if (search) {
        this.productsService.searchProducts(search);
      } else {
        this.productsService.getProducts();
      }
    })
  );

  destroyed$ = new Subject<void>();

  vm$ = combineLatest([
    this.products$,
    this.loading$,
    this.productLoading$,
    this.queryParams$,
  ]).pipe(
    map((array) => {
      const [products, loading, productLoading, queryParams] = array;
      return {
        products,
        loading,
        productLoading,
        queryParams,
      };
    })
  );

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onAddToCart(id: number) {
    this.productsService.addToCart(id);
  }
}
