import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  InvalidCredentialsError: string = '';
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(
        this.loginForm.value.username?.toString(),
        this.loginForm.value.password?.toString()
      )
      .subscribe({
        next: (user) => {
          this.router.navigate(['/']);
          this.authService.userSignal.set(user.user);
        },
        error: (error) => {
          this.InvalidCredentialsError =
            'Invalid Credentials, Please try again';

          console.log('Error logging in', error.error);
        },
      });
  }
}
