import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FeaturedEventsComponent } from "../../home/featured-events/featured-events.component";
import { EventListComponent } from "../../home/event-list/event-list.component";

@Component({
  selector: 'app-home-page',
  imports: [FeaturedEventsComponent, EventListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
