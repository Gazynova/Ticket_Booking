import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { SectionDividerComponent } from "../../shared/section-divider/section-divider.component";
import { GenericButtonComponent } from "../../shared/generic-button/generic-button.component";


@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.component.html',
  styleUrls: ['./featured-events.component.css'],
  imports: [NgFor, CommonModule, SectionDividerComponent, GenericButtonComponent],
})
export class FeaturedEventsComponent
{
  featuredEvents = [
    {
      id: 1,
      title: 'Rock Concert Night',
      date: 'July 25, 2025',
      location: 'Mumbai Arena',
      imageUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
    },
    {
      id: 2,
      title: 'Stand-Up Comedy Special',
      date: 'August 10, 2025',
      location: 'Bangalore Theater',
      imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    },
    {
      id: 3,
      title: 'Food & Music Festival',
      date: 'September 5, 2025',
      location: 'Delhi Grounds',
      imageUrl: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
    },
    {
      id: 3,
      title: 'Food & Music Festival',
      date: 'September 5, 2025',
      location: 'Delhi Grounds',
      imageUrl: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
    },
    {
      id: 3,
      title: 'Food & Music Festival',
      date: 'September 5, 2025',
      location: 'Delhi Grounds',
      imageUrl: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
    },
    {
      id: 3,
      title: 'Food & Music Festival',
      date: 'September 5, 2025',
      location: 'Delhi Grounds',
      imageUrl: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
    },
  ];


  bookNow() {
  console.log("Booking from this page!");
  // custom booking logic
}

  
  

  

  
}
