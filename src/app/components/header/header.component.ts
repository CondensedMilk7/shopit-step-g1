import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() searchText = '';
  @Input() isDark = false;
  @Input() user: User | null = null;
  @Output() toggleDark = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() signOut = new EventEmitter<void>();
}
