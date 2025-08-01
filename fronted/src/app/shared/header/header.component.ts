import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgIf, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
    public searchService: SearchService
  ) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isMenuOpen = false;
  isProfileMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

 

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('#user-menu-button') &&
      !target.closest('#profile-menu')
    ) {
      this.isProfileMenuOpen = false;
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value.trim().toLowerCase();
    this.searchService.setSearchQuery(query);
  }
  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setSearchQuery(input.value);
  }
}
