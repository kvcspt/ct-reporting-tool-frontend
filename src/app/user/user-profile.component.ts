import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup;
  public userId: number | undefined;

  public constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        name: [''],
        title: [''],
      },
      { validator: this.passwordMatchValidator },
    );
  }

  public ngOnInit(): void {
    this.userId = this.authService.getUId();

    if (this.userId) {
      this.userService.getUserDataById(this.userId).subscribe((user: User) => {
        this.userForm.patchValue({
          username: user.username,
          name: user.name,
          title: user.title,
        });
      });
    }
  }

  private passwordMatchValidator(
    formGroup: FormGroup,
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    const updatedUser: User = {
      id: this.userId || 0,
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      name: this.userForm.value.name,
      title: this.userForm.value.title,
      role: 'USER',
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: (response: any) => {
        console.log('User updated successfully', response);
        this.toastr.success('Your profile has been updated.');
      },
      error: (err: any) => {
        console.error('Error updating user:', err);
        this.toastr.error('An error occurred while updating your profile.');
      },
    });
  }
}
