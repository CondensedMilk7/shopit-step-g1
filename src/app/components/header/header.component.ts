import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageType } from 'src/app/types/page-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchText = '';
  @Input() isDark = false;
  @Output() toggleDark = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<PageType>();
}
