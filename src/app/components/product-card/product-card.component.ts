import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() deleteProduct = new EventEmitter<number>();

  onDelete() {
    this.deleteProduct.emit(this.product.id);
  }
}
