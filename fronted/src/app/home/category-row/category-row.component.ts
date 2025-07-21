import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/service';


@Component({
  selector: 'app-category-row',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './category-row.component.html',
})
export class CategoryRowComponent implements OnInit {
  private apiService = inject(ApiService);

  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.map((c: any) => c.name);
      },
      error: () => {
        console.error('Failed to load categories');
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}
