import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private apiService = inject(ApiService);

  @Input() isCollapsed: boolean = false;
  @Output() categorySelected = new EventEmitter<string>();
  @Output() sidebarToggled = new EventEmitter<void>();

  categories: string[] = ['All'];
  otherCategories: string[] = [];
  isAllDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        const fetchedCategories = res.map((c: any) => c.name);
        this.otherCategories = fetchedCategories;
        this.categories = ['All', ...fetchedCategories];
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  toggleAllDropdown() {
    this.isAllDropdownOpen = !this.isAllDropdownOpen;
  }
}
