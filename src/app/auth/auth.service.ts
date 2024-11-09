import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginPath = '/api/auth/login';
  private readonly registerPath: string = '/api/auth/register';
  private isAuthenticated = false;
  private loggedInUser: User | null | undefined;

  public constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public login(user: User): Observable<User> {
    return this.http.post<User>(this.loginPath, user).pipe(
      tap((responseUser: User) => {
        this.isAuthenticated = true;
        this.loggedInUser = responseUser;
      }),
    );
  }

  public register(user: User): Observable<object> {
    return this.http.post(this.registerPath, user);
  }

  public logout(): void {
    this.isAuthenticated = false;
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public isAdmin(): boolean {
    return this.loggedInUser != null && this.loggedInUser.role === 'ADMIN';
  }
}
