import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/service';
import { environment } from '../../services/environment';
import { GenericButtonComponent } from '../../shared/generic-button/generic-button.component';
import { CartItem } from '../../models/category.model';

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

  constructor(private api: ApiService) {}
  userId = localStorage.getItem('userId');
  
  ngOnInit() {
    if (this.userId) {
      this.api.getCart(this.userId).subscribe({
        next: (res) => {
          this.cartItems = res;
          this.calculateTotal();
        },
        error: (err) => console.error('Failed to load cart', err),
      });
    }
  }

  // getCartItems() {
  //   this.api.getCart().subscribe({
  //     next: (res: any[]) => {
  //       this.cartItems = res;
  //       this.calculateTotal();
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    console.log(this.totalAmount);
  }

  removeFromCart(itemId: number) {
    this.api.removeFromCart(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
        this.calculateTotal();
        alert('Item removed from cart');
      },
    });
  }

  proceedToCheckout() {
    alert('Proceeding to checkout...');
    // You can navigate or call API for checkout
  }
}
