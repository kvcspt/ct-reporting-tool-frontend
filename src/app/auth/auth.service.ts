import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginPath: string = '/api/auth/login';
  private readonly registerPath: string = '/api/auth/register';

  public constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) {}

  public login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.loginPath}`, user);
  }

  public register(user: User): Observable<object> {
    return this.http.post(this.registerPath, user);
  }

  private getRole(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return '';
  }

  public isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  public startTokenExpirationTimer(token: string): void {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    if (expirationDate) {
      const now = new Date().getTime();
      const timeLeft = expirationDate.getTime() - now;

      if (timeLeft > 0) {
        setTimeout(() => {
          console.log('Token has expired!');
          this.logout();
        }, timeLeft);
      } else {
        console.log('The token has already expired.');
      }
    }
  }
}
