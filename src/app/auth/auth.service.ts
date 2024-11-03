import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginPath = "/api/auth/login";
  private readonly registerPath: string = "/api/auth/register";
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User){
    return this.http.post(this.loginPath, user).pipe(
      tap(() => this.isAuthenticated = true)
    );
  }

  register(user: User){
    return  this.http.post(this.registerPath, user);
  }

  logout() {
    this.isAuthenticated = false; // Set authenticated to false on logout
    this.router.navigate(['/login']); // Navigate to the login page
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated; // Return the authentication status
  }
}
