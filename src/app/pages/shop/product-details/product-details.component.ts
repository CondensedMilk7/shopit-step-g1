import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product$ = this.activatedRoute.paramMap.pipe(
    switchMap((paramMap) =>
      this.productsService.getProductById(Number(paramMap.get('productId')))
    )
  );

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}
}
