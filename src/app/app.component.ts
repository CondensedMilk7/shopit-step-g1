import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDark = false;
  searchText = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const isDark = localStorage.getItem('is_dark');
    if (isDark === 'true') {
      this.isDark = true;
    } else {
      this.isDark = false;
    }

    this.route.queryParamMap.subscribe((paramMap) => {
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
}
