import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../services/environment';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  env = environment;
  
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    // Assuming backend userId or use 'guest' if not logged in for demo
    const userId = localStorage.getItem('userId') || 'guest';
    
    this.orderService.getOrders(userId).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loading = false;
      }
    });
  }

  getFullImageUrl(imagePath: string): string {
    return `${this.env.img}${imagePath}`;
  }
}
