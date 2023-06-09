import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../types/product';

@Pipe({
  name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], searchText: string): Product[] {
    return products.filter((product) =>
      product.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }
}
