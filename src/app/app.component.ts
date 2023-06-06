import { Component } from '@angular/core';
import { Product } from './types/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  inputText = 'Hello';
  products: Product[] = [
    {
      id: 1,
      title: 'MacBook Pro M2',
      description: 'Latest MacBook powered by Apple Sillicon',
      price: 6999,
      discountPercentage: 12,
      thumbnail:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'Lenovo ThinkPad',
      description: 'Latest ThinkPad powered by Lenovo',
      price: 5999,
      discountPercentage: 30,
      thumbnail:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'DELL XPS 15 (2022)',
      description: 'The most powerful DELL ultrabook',
      price: 4499,
      discountPercentage: 4,
      thumbnail:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      title: 'Asus Zenbook',
      description: 'Great Asus Laptop',
      price: 3999,
      discountPercentage: 0,
      thumbnail:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    },
  ];
}
