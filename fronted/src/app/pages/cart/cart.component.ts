import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/service';
import { environment } from '../../services/environment';
import { GenericButtonComponent } from '../../shared/generic-button/generic-button.component';
import { CartItem } from '../../models/category.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, GenericButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  env = environment;
  totalAmount: number = 0;
  CartCount: number = 0;

  constructor(
    private api: ApiService,
    private router: Router,
    private cartService: CartService
  ) {}
  userId = localStorage.getItem('userId');

  ngOnInit() {
    if (this.userId) {
      this.api.getCart(this.userId).subscribe({
        next: (res) => {
          this.cartItems = res;
          this.calculateTotal();
          this.cartService.cartCount$.subscribe((count) => {
            this.CartCount = count;
          });
        },
        error: (err) => console.error('Failed to load cart', err),
      });
    }
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    console.log(this.totalAmount);
  }

  removeFromCart(itemId: number) {
    this.userId = localStorage.getItem('userId');

    this.api.removeFromCart(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.calculateTotal();
        console.log('Item removed from cart');
        confirm('Item removed from cart');
        // this.cartService.updateCountManually(this.CartCount-1);
        this.cartService.getCartCount(this.userId!); // refresh cart count
      },
      error: (err) => {
        console.error('Error removing from cart', err);
      },
    });
  }

  proceedToCheckout() {
    alert('Proceeding to checkout...');
    // You can navigate or call API for checkout
  }

  getEventDetail(id: number) {
    this.router.navigate(['/event-detail'], {
      state: { eventid: id },
    });
  }

  updateQuantity(item: any, action: 'increase' | 'decrease') {
    let newQuantity = item.quantity;

    if (action === 'increase') {
      newQuantity++;
    } else if (action === 'decrease' && item.quantity === 1) {
      console.log('Item removed from cart');
      this.api.removeFromCart(item.id).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
          this.calculateTotal();
          alert('Item removed from cart');
        },
      });
    } else if (action === 'decrease') {
      newQuantity--;
    }

    // Call API to update quantity in DB
    this.api.updateCartQuantity(item.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity; // Update UI only after API success
      },
      error: (err) => {
        console.error('Failed to update quantity', err);
      },
    });
  }
}
