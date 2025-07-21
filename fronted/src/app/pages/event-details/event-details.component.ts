import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/service';
import { environment } from '../../services/environment';
import { GenericButtonComponent } from "../../shared/generic-button/generic-button.component";


@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [NgIf, GenericButtonComponent],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 0;
  event: any;
  loading: boolean = false;
  error: string = '';
  env = environment;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventId = history.state.eventid;

    if (this.eventId) {
      this.fetchEventDetails(this.eventId);
    } else {
      this.error = 'Invalid Event ID';
    }
  }

  fetchEventDetails(id: number) {
    this.loading = true;
    this.apiService.getProductById(id).subscribe({
      next: (res) => {
        this.event = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load event details';
        this.loading = false;
      },
    });
  }


 addToCart(productId: number) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.apiService.addToCart({ productId, quantity: 1 ,userId}).subscribe({
      next: () => alert('Added to cart'),
      error: () => alert('Failed to add to cart'),
    });
  }
}

