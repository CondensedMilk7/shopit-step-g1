import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENVIRONMENT } from 'src/environment/environment';
import { LoginCredentials, User } from '../types/user';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = ENVIRONMENT.baseUrl;

  private loading$ = new BehaviorSubject<boolean>(false);
  private errorMsg$ = new BehaviorSubject<string>('');
  private user$ = new BehaviorSubject<User | null>(null);

  get loading() {
    return this.loading$.asObservable();
  }

  get errorMsg() {
    return this.errorMsg$.asObservable();
  }

  get user() {
    return this.user$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  init() {
    const token = localStorage.getItem(ENVIRONMENT.tokenKey);
    if (!token) {
      this.signOut();
      this.router.navigate(['/']);
    }
    const user = localStorage.getItem(ENVIRONMENT.userKey);
    if (user) {
      this.user$.next(JSON.parse(user));
    }
  }

  signIn(credentials: LoginCredentials) {
    this.loading$.next(true);
    return this.http.post<User>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.loading$.next(false);
        this.user$.next(response);
        localStorage.setItem(ENVIRONMENT.userKey, JSON.stringify(response));
        localStorage.setItem(ENVIRONMENT.tokenKey, response.token);
        this.router.navigate(['/shop']);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        this.errorMsg$.next(errorResponse.error.message);
        this.loading$.next(false);
        return of(false);
      })
    );
  }

  signOut() {
    localStorage.removeItem(ENVIRONMENT.userKey);
    localStorage.removeItem(ENVIRONMENT.tokenKey);
    this.user$.next(null);
  }

  getUserId() {
    const userStr = localStorage.getItem(ENVIRONMENT.userKey);
    if (userStr) {
      const user = JSON.parse(userStr) as User;
      return user.id;
    }
    return null;
  }

  getToken() {
    return localStorage.getItem(ENVIRONMENT.tokenKey);
  }

  isAuthenticated() {
    return !this.jwtHelper.isTokenExpired();
  }

  canActivate() {
    if (!this.isAuthenticated()) {
      this.signOut();
      this.router.navigate(['/sign-in']);
      return false;
    } else {
      return true;
    }
  }
}
