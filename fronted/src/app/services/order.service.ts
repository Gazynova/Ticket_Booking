import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersKey = 'ticket_booking_orders';
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadOrders();
  }

  private loadOrders() {
    if (isPlatformBrowser(this.platformId)) {
      const ordersJson = localStorage.getItem(this.ordersKey);
      if (ordersJson) {
        this.ordersSubject.next(JSON.parse(ordersJson));
      }
    }
  }

  getOrders(userId: string): Observable<Order[]> {
    const allOrders = this.ordersSubject.value;
    const userOrders = allOrders.filter(order => order.userId === userId);
    // Sort by date desc
    userOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return of(userOrders);
  }

  getAllOrders(): Observable<Order[]> {
    // For Admin
    return this.orders$;
  }

  createOrder(order: Order): Observable<boolean> {
    const currentOrders = this.ordersSubject.value;
    const updatedOrders = [...currentOrders, order];
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.ordersKey, JSON.stringify(updatedOrders));
      this.ordersSubject.next(updatedOrders);
    }
    return of(true);
  }

  // Analytics Helpers
  getTotalRevenue(): number {
    return this.ordersSubject.value.reduce((acc, order) => acc + order.totalAmount, 0);
  }

  getTotalOrdersCount(): number {
    return this.ordersSubject.value.length;
  }

  getRecentOrders(limit: number = 5): Observable<Order[]> {
    const allOrders = [...this.ordersSubject.value];
    // Sort by date desc
    allOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return of(allOrders.slice(0, limit));
  }
}
