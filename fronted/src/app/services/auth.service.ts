import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  
  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    const userId = localStorage.getItem('userId');
    // console.log(userId);
    return !!userId; // returns true if userId exists, otherwise false
  }

  getUserRole(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('roles');
  }

  getUserId(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('userId');
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  isAdmin(): boolean {
    if (!this.isBrowser()) return false;
    try {
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      return roles?.includes('Administrator');
    } catch {
      return false;
    }
  }
}
