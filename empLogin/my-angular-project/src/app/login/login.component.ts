
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to dashboard...',
        }).then(() => {
          this.router.navigate(['user-list']);
        });
      },
      (error) => {
        console.error('Login error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Username or password is incorrect.',
        });
      }
    );
  }
}
