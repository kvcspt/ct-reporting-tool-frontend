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
  private loggedInUser: User | null | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User){
    return this.http.post<User>(this.loginPath, user).pipe(
      tap((responseUser: User) => {
        this.isAuthenticated = true;
        this.loggedInUser = responseUser;
      })
    );
  }

  register(user: User){
    return  this.http.post(this.registerPath, user);
  }

  logout() {
    this.isAuthenticated = false;
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.loggedInUser != null && this.loggedInUser.role === "ADMIN";
  }
}
