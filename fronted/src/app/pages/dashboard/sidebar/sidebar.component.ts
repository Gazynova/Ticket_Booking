import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private apiService = inject(ApiService);

  @Output() categorySelected = new EventEmitter<string>();

  categories: string[] = ['All'];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        const fetchedCategories = res.map((c: any) => c.name);
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
}
