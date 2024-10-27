import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import {AuthService} from "../auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      title: [''],
      role: ['']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const newUser: User = new User(
        0,
        this.registrationForm.value.username,
        this.registrationForm.value.password,
        this.registrationForm.value.name,
        this.registrationForm.value.title,
        "USER"
      );
      this.authService.register(newUser).subscribe({
        next: (resp) => {
          this.toastr.success("Registration successful");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.success("Something went wrong!");
        }
      })
    }
  }
}
