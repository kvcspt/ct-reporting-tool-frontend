import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginPath = "/api/auth/login";
  private readonly registerPath: string = "/api/auth/register";
  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post(this.loginPath, user);
  }

  register(user: User){
    return  this.http.post(this.registerPath, user);
  }
}
