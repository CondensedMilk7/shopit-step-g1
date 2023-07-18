import { Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RecommendedComponent } from './pages/shop/recommended/recommended.component';
import { AllComponent } from './pages/shop/all/all.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ProductDetailsComponent } from './pages/shop/product-details/product-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { canActivateAuthorized } from './guards';

export const APP_ROUTES: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {
        path: 'recommended',
        component: RecommendedComponent,
        canActivate: [canActivateAuthorized],
      },
      { path: ':productId', component: ProductDetailsComponent },
      { path: '', component: AllComponent },
    ],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [canActivateAuthorized],
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
];
