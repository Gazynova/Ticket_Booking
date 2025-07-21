import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { SidebarComponent } from "../../pages/dashboard/sidebar/sidebar.component";
import { ProductListComponent } from "../../pages/dashboard/products/products.component";

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, ProductListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedCategory: string = '';

  filterProducts(category: string) {
    this.selectedCategory = category;
  }
}

