import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/service';

@Component({
  selector: 'app-unified-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './unified-auth.component.html',
  styleUrl: './unified-auth.component.css'
})
export class UnifiedAuthComponent implements OnInit {
  isLoginMode = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check initial route to set mode
    this.isLoginMode = !this.router.url.includes('/register');
    this.initForms();
  }

  initForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['']
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mustMatch': true };
  }

  get lf() { return this.loginForm.controls; }
  get rf() { return this.registerForm.controls; }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.submitted = false;
    this.errorMessage = '';
    // Update URL using Router
    const newPath = this.isLoginMode ? '/login' : '/register';
    this.router.navigate([newPath], { replaceUrl: true });
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;
    const loginPayload = { userName: email, password };

    this.apiService.login(loginPayload).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('Login Result:', res);
        
        // Handle both possible response structures
        const user = res.user || res;
        const userId = user.id || res.userId;
        const roles = user.roles || res.roles;
        
        if (userId) {
          localStorage.setItem('userId', userId);
          localStorage.setItem('email', user.email || this.loginForm.value.email);
          localStorage.setItem('roles', JSON.stringify(roles || []));
          if (res.token) localStorage.setItem('token', res.token);
          
          console.log('Stored Auth Data. Redirecting to home...');
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Login failed: User data not found in response';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }

  onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.apiService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        alert('Registration successful! Please login.');
        this.toggleMode();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
