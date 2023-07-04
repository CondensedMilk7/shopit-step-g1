import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isDark = false;
  searchText = '';
  destroyed$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const isDark = localStorage.getItem('is_dark');
    if (isDark === 'true') {
      this.isDark = true;
    } else {
      this.isDark = false;
    }

    this.productsService.getCart();

    // this.productsService.addProduct({
    //   id: 200,
    //   title: 'BMW Pencil',
    //   brand: 'BMW',
    //   category: 'electronics',
    //   description: 'Fastest and least safe pencil in the world!',
    //   thumbnail: 'example.com',
    //   price: 20,
    // });

    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        const search = paramMap.get('search');
        if (search) {
          this.searchText = search;
        }
      });
  }

  onToggleDark(darkMode: boolean) {
    this.isDark = darkMode;
    localStorage.setItem('is_dark', darkMode.toString());
  }

  onSearch(text: string) {
    this.router.navigate(['shop'], { queryParams: { search: text } });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
