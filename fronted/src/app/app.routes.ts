import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './guards/auth.guard'; // import the guard
import { BlackholeComponent } from './blackhole/blackhole.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'event-detail', component: EventDetailsComponent },
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
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'blackhole', component: BlackholeComponent },
 

];
