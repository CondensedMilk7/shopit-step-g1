import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from './data';
import { PageType } from './types/page-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDark = false;
  productSearchText = '';
  currentPage: PageType = 'shop';

  ngOnInit() {
    const isDark = localStorage.getItem('is_dark');
    if (isDark === 'true') {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  }

  onToggleDark(darkMode: boolean) {
    this.isDark = darkMode;
    localStorage.setItem('is_dark', darkMode.toString());
  }

  onSearch(text: string) {
    this.productSearchText = text;
  }

  onNavigate(page: PageType) {
    this.currentPage = page;
  }
}
