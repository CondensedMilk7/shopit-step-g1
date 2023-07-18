import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardHighlightDirective } from './directives/card-highlight.directive';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { RecommendedComponent } from './pages/shop/recommended/recommended.component';
import { AllComponent } from './pages/shop/all/all.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ProductDetailsComponent } from './pages/shop/product-details/product-details.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ENVIRONMENT } from 'src/environment/environment';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    HeaderComponent,
    CardHighlightDirective,
    ProductFilterPipe,
    ShopComponent,
    CartComponent,
    RecommendedComponent,
    AllComponent,
    SignInComponent,
    ProductDetailsComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem(ENVIRONMENT.tokenKey),
        allowedDomains: ['dummyjson.com'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
