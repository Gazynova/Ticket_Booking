import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser, DecimalPipe } from '@angular/common';
import { ApiService } from '../../services/service';
import { environment } from '../../services/environment';
import { GenericButtonComponent } from '../../shared/generic-button/generic-button.component';
import { CartItem } from '../../models/category.model';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PaymentService } from '../../services/payment.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MockEmailComponent } from '../../shared/mock-email/mock-email.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, GenericButtonComponent, DecimalPipe, MockEmailComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  env = environment;
  totalAmount: number = 0;
  CartCount: number = 0;
  
  // Success Mock Email state
  showSuccessEmail = false;
  lastOrder: any = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private cartService: CartService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  userId: string | null = null;

  ngOnInit() {
    this.userId = isPlatformBrowser(this.platformId) ? localStorage.getItem('userId') : null;
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
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.paymentService.initiatePayment(
      this.totalAmount, 
      'user@example.com', // Placeholder
      '9999999999',       // Placeholder
      (response) => {
        // Success Callback
        console.log('Payment ID:', response.razorpay_payment_id);
        
        // Create Order Object
        const newOrder: Order = {
          id: crypto.randomUUID(), // Generate a unique ID
          userId: this.userId || 'guest',
          items: [...this.cartItems],
          totalAmount: this.totalAmount,
          paymentId: response.razorpay_payment_id,
          date: new Date(),
          status: 'CONFIRMED'
        };

        // Save Order
        this.orderService.createOrder(newOrder).subscribe(() => {
          this.lastOrder = newOrder;
          this.showSuccessEmail = true;

          // Clear Cart (UI)
          this.cartItems = [];
          this.totalAmount = 0;
          this.cartService.updateCountManually(0);
        });
      },
      (error) => {
        // Failure Callback
        console.error('Payment Failed:', error);
        alert('Payment Failed. Please try again.');
      }
    );
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

  closeSuccessEmail() {
    this.showSuccessEmail = false;
    this.router.navigate(['/admin']); 
  }
}
