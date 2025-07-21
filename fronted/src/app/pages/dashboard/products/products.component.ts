import { NgFor, NgStyle } from '@angular/common';
import { Component, Input, OnChanges, inject, OnInit, OnDestroy } from '@angular/core';
import { GenericButtonComponent } from '../../../shared/generic-button/generic-button.component';
import { ApiService } from '../../../services/service';
import { environment } from '../../../services/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, GenericButtonComponent, NgStyle],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {
  private apiService = inject(ApiService);
  private searchService = inject(SearchService);

  constructor(private router: Router) {}

  @Input() selectedCategory: string | null = null;
  env = environment;

  products: any[] = [];
  filteredProducts: any[] = [];
  searchSubscription!: Subscription;
  searchQuery: string = '';

  ngOnInit(): void {
    this.loadProducts();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (query) => {
        this.searchQuery = query.toLowerCase();
        this.applyFilter();
      }
    );
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadProducts() {
    this.apiService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.applyFilter();
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      },
    });
  }

  applyFilter() {
    this.filteredProducts = this.products.filter((p) => {
      const matchesCategory =
        !this.selectedCategory || this.selectedCategory === 'All' || p.categoryName === this.selectedCategory;
      const matchesSearch =
        !this.searchQuery || p.title.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });
  }

  getFullImageUrl(imagePath: string): string {
    return `${this.env.img}${imagePath}`;
  }

  modifyProduct(productId: number) {
    this.router.navigate(['/admin/edit-product', productId]);
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter((p) => p.id !== productId);
          this.applyFilter();
          alert('Product deleted');
        },
        error: () => alert('Failed to delete product'),
      });
    }
  }

  navigateToAddProduct() {
    this.router.navigate(['/admin/add-product']);
  }
}
