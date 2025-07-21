import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  
  isLoggedIn(): boolean {
    const userId = localStorage.getItem('userId');
    // console.log(userId);
    return !!userId; // returns true if userId exists, otherwise false
  }

  getUserRole(): string | null {
    console.log
    return localStorage.getItem('roles');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.clear();
  }
isAdmin(): boolean {
  try {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles?.includes('Administrator');
  } catch {
    return false;
  }
}

}
