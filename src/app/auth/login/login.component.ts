import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public errorMessage: string | undefined;

  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      const user = new User(
        0,
        this.loginForm.value.username,
        this.loginForm.value.password,
        '',
        '',
        'USER',
      );
      this.authService.login(user).subscribe({
        next: () => {
          this.toastr.success('Successful login');
          this.router.navigate(['/ct-studies']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password!';
        },
      });
    }
  }
}
