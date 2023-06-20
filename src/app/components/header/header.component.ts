import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() searchText = '';
  @Input() isDark = false;
  @Output() toggleDark = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
}
