import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-row',
  imports:[CommonModule],
  templateUrl: './category-row.component.html',
})
export class CategoryRowComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  selectedCategory: string = '';

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.categorySelected.emit(category);
  }
}
