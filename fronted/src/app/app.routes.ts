import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './guards/auth.guard'; // import the guard
import { BlackholeComponent } from './blackhole/blackhole.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'event-detail', component: EventDetailsComponent },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/edit-product/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard],
    
  },
  { path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', loadComponent: () => import('./pages/auth/unified-auth/unified-auth.component').then(m => m.UnifiedAuthComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/unified-auth/unified-auth.component').then(m => m.UnifiedAuthComponent) },
  {
    path: 'admin/bookings',
    loadComponent: () => import('./admin/bookings/bookings.component').then(m => m.BookingsComponent),
    canActivate: [AuthGuard],
  },
  { path: 'blackhole', component: BlackholeComponent },
 

];
