import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryRowComponent } from '../category-row/category-row.component';
import { GenericButtonComponent } from '../../shared/generic-button/generic-button.component';
import { ApiService } from '../../services/service';
import { environment } from '../../services/environment';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, NgFor, GenericButtonComponent],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private searchService: SearchService,
    private cartService: CartService
  ) {}

  categories: string[] = ['All'];
  allevents: any[] = [];
  events: any[] = [];
  searchSubscription!: Subscription;
  searchQuery: string = '';

  ngOnInit() {
    this.getAllCategories();
    this.getAllEvents();

    this.searchSubscription = this.searchService.searchQuery$.subscribe(
      (query) => {
        this.searchQuery = query;
        this.filterProducts();
      }
    );
  }

  filterProducts() {
    this.events = this.allevents.filter((e) =>
      e.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getAllCategories() {
    this.apiService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = ['All', ...res.map((c: any) => c.name)];
      },
      error: () => {
        alert('Failed to load categories');
      },
    });
  }

  getAllEvents() {
    this.apiService.getAllProducts().subscribe({
      next: (res: any) => {
        this.allevents = res.map((e: any) => ({
          ...e,
          imageUrl: environment.img + e.image,
          // imageUrl:  e.image,
          category: e.categoryName,
        }));
        this.events = [...this.allevents];
      },
      error: () => {
        alert('Failed to load products');
      },
    });
  }

  onCategorySelect(category: string) {
    this.events =
      category === 'All'
        ? [...this.allevents]
        : this.allevents.filter((e) => e.category === category);
  }

  getEventDetail(id: number) {
    this.router.navigate(['/event-detail'], {
      state: { eventid: id },
    });
  }

  addToCart(productId: number) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.addToCart({ productId, quantity: 1, userId }).subscribe({
      next: () => {
        this.cartService.getCartCount(userId); // refresh cart count
        alert('Added to cart');
      },
      error: () => alert('Failed to add to cart'),
    });
   
  }

  

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
