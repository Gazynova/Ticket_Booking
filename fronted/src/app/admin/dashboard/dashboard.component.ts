import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf, NgClass, NgFor, DecimalPipe, DatePipe, SlicePipe } from '@angular/common';
import { SidebarService } from '../../services/sidebar.service';
import { OrderService } from '../../services/order.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidebarComponent } from "../../pages/dashboard/sidebar/sidebar.component";
import { ProductListComponent } from "../../pages/dashboard/products/products.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ProductListComponent, NgIf, NgClass, NgFor, DecimalPipe, DatePipe, SlicePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  selectedCategory: string = '';
  isSidebarCollapsed: boolean = false;
  
  totalRevenue: number = 0;
  totalOrders: number = 0;
  recentOrders: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private orderService: OrderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Load Static Analytics
    this.totalRevenue = this.orderService.getTotalRevenue();
    this.totalOrders = this.orderService.getTotalOrdersCount();

    // Load Streamed Analytics
    this.orderService.getRecentOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(orders => this.recentOrders = orders);

    // Initial Screen Check (SSR Safe)
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth < 1024) {
        this.sidebarService.closeSidebar();
      }
    }

    // Subscribe to Single Source of Truth
    this.sidebarService.sidebarOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen: boolean) => {
        this.isSidebarCollapsed = !isOpen; 
      });
  }

  filterProducts(category: string) {
    this.selectedCategory = category;
    // Auto-close sidebar on mobile after selecting a category
    this.closeSidebarOnMobile();
  }

  onSidebarToggle() {
    if (this.isSidebarCollapsed) {
      this.sidebarService.openSidebar();
    } else {
      this.sidebarService.closeSidebar();
    }
  }

  closeSidebarOnMobile() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth < 1024) {
      this.sidebarService.closeSidebar();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}