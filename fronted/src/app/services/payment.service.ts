import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  // REPLACE WITH YOUR ACTUAL KEY ID
  private keyId = 'rzp_test_1DP5mmOlF5G5ag'; 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  initiatePayment(amount: number, userEmail: string, userPhone: string, onSuccess: (response: any) => void, onFailure: (error: any) => void) {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Payment cannot be initiated on server');
      return;
    }

    if (typeof Razorpay === 'undefined') {
      console.error('Razorpay SDK not loaded');
      onFailure({ error: 'Razorpay SDK not loaded' });
      return;
    }

    const options = {
      key: this.keyId,
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Ticket Booking App',
      description: 'Purchase Tickets',
      image: 'https://angular.io/assets/images/logos/angular/angular.png', // Optional logo
      handler: function (response: any) {
        // Payment Success
        console.log('Payment Successful', response);
        onSuccess(response);
      },
      prefill: {
        name: 'User Name', // meaningful data from user profile if available
        email: userEmail,
        contact: userPhone
      },
      notes: {
        address: 'Ticket Booking Office'
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
          onFailure({ error: 'Payment Cancelled' });
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response: any) {
      console.error('Payment Failed', response.error);
      onFailure(response.error);
    });

    rzp.open();
  }
}
