import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bookings.component.html'
})
export class BookingsComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  searchTerm = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getRecentOrders(50).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredOrders() {
    return this.orders.filter(order => 
      order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
  }
}
