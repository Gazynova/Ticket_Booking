import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [CommonModule,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
    if (!target.closest('#user-menu-button') && !target.closest('#profile-menu')) {
      this.isProfileMenuOpen = false;
    }
  }
}