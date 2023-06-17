import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isDark = false;
  productSearchText = '';

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
}
