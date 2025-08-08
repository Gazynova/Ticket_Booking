import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl; // Base URL for your API
  
  // BehaviorSubject to hold the latest cart count
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  
  constructor(private http: HttpClient) {}

  getCartCount(userId: string) {
    this.http.get<number>(`${this.apiUrl}/cart/count/${userId}`).subscribe(count => {
      this.cartCountSubject.next(count); // update observable value
    });
  }

  updateCountManually(count: number) {
    this.cartCountSubject.next(count);
  }
}
