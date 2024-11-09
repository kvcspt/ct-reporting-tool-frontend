import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from '../model/user';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public registrationForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.registrationForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        name: [''],
        title: [''],
        role: ['USER'],
      },
      { validators: this.matchValidator('password', 'confirmPassword') },
    );
  }

  public matchValidator(
    controlName: string,
    matchingControlName: string,
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (
        matchingControl!.errors &&
        !matchingControl!.errors?.['confirmedValidator']
      ) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { passwordMismatch: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }
  public onSubmit(): void {
    if (this.registrationForm.valid) {
      const newUser: User = new User(
        0,
        this.registrationForm.value.username,
        this.registrationForm.value.password,
        this.registrationForm.value.name,
        this.registrationForm.value.title,
        this.registrationForm.value.role,
      );
      this.authService.register(newUser).subscribe({
        next: () => {
          this.toastr.success('Registration successful');
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toastr.error('Something went wrong!');
        },
      });
    }
  }
}
