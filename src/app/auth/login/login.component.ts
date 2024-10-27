import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {User} from "../model/user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let user = new User(0, this.loginForm.value.username, this.loginForm.value.password,"","","");
      this.authService.register(user).subscribe({
        next: (resp) => {
          this.toastr.success("Registration successful");
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.success("Something went wrong!");
        }
      })
    }
  }
}
