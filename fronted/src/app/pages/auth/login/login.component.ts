import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApiService } from '../../../services/service';
import { log } from 'console';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) return;

  this.loading = true;
  const { email, password } = this.loginForm.value;

  this.apiService.login({ userName: email, password }).subscribe({
    next: (res: any) => {
      this.loading = false;
      if (res.success) {
        console.log('Login Successful');

        const user = res.user;

        // Store user details in localStorage
        localStorage.setItem('userId', user.id);
        localStorage.setItem('email', user.email);
        localStorage.setItem('roles', JSON.stringify(user.roles));

        // Role-based navigation
        if (user.roles.includes('Administrator')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        alert(res.message || 'Invalid credentials');
      }
    },
    error: (err) => {
      this.loading = false;
      alert('Error: ' + (err.error?.message || 'Server error'));
    },
  });
}

}