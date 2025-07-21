// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    const token = localStorage.getItem('userId'); // Or use any key like token
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };
}
