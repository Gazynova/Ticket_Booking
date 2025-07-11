import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'event/:id',
    component: EventDetailsComponent,
  },
];
