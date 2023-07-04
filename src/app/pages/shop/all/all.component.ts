import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit, OnDestroy {
  products$ = this.productsService.products$;
  loading$ = this.productsService.loading$;
  productLoading$ = this.productsService.productLoading$;
  destroyed$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        const search = paramMap.get('search');
        if (search) {
          this.productsService.searchProducts(search);
        } else {
          this.productsService.getProducts();
        }
      });
  }

  onAdd() {
    this.productsService.updateProduct(this.products$.value[0].id, {
      title: 'Hello',
    });
  }

  onAddToCart(id: number) {
    this.productsService.addToCart(id);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
