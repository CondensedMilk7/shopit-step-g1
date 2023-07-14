import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  signInData = {
    username: '',
    password: '',
  };

  loading$ = this.authService.loading;
  errorMsg$ = this.authService.errorMsg;

  vm$ = combineLatest([this.loading$, this.errorMsg$]).pipe(
    map(([loading, errorMsg]) => ({ loading, errorMsg }))
  );

  constructor(
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  onSubmit() {
    const { username, password } = this.signInData;
    if (username && password) {
      this.authService.signIn(this.signInData).subscribe(() => {
        this.productsService.getCart();
      });
    }
  }
}
