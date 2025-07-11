// event-list.component.ts
import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryRowComponent } from '../category-row/category-row.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, NgFor, CategoryRowComponent,RouterLink],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent {

  categories: string[] = ['All','Music', 'Art', 'Sports', 'Tech', 'Comedy','Food', 'Health','Movie'];

  allevents = [
    {
      id: 1,
      title: 'Music Fiesta',
      date: 'Aug 15, 2025',
      location: 'Mumbai',
      category: 'Music',
      imageUrl:
        'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg',
    },
    {
      id: 2,
      title: 'Tech Talk',
      date: 'Aug 20, 2025',
      location: 'Bangalore',
      category: 'Tech',
      imageUrl:
        'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
    },
    {
      id: 3,
      title: 'Tech Talk',
      date: 'Aug 20, 2025',
      location: 'Bangalore',
      category: 'Tech',
      imageUrl:
        'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
    },
    {
      id: 4,
      title: 'Music Fiesta',
      date: 'Aug 15, 2025',
      location: 'Mumbai',
      category: 'Music',
      imageUrl:
        'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg',
    },
    {
      id: 5,
      title: 'Tech Talk',
      date: 'Aug 20, 2025',
      location: 'Bangalore',
      category: 'Tech',
      imageUrl:
        'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
    },
    {
      id: 6,
      title: 'Startup Showcase',
      date: 'Sep 05, 2025',
      location: 'Hyderabad',
      category: 'Business',
      imageUrl:
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    },
    {
      id: 7,
      title: 'Art & Soul',
      date: 'Sep 12, 2025',
      location: 'Pune',
      category: 'Art',
      imageUrl:
        'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg',
    },
    {
      id: 8,
      title: 'Cine Carnival',
      date: 'Sep 18, 2025',
      location: 'Chennai',
      category: 'Film',
      imageUrl:
        'https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg',
    },
    {
      id: 9,
      title: 'Food Fusion Fest',
      date: 'Sep 25, 2025',
      location: 'Delhi',
      category: 'Food',
      imageUrl:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    },
    {
      id: 10,
      title: 'Code Craze',
      date: 'Oct 01, 2025',
      location: 'Ahmedabad',
      category: 'Tech',
      imageUrl:
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    },
    {
      id: 11,
      title: 'Yoga in the Park',
      date: 'Oct 07, 2025',
      location: 'Kochi',
      category: 'Health',
      imageUrl:
        'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
    },
    {
      id: 12,
      title: 'Photography Walk',
      date: 'Oct 15, 2025',
      location: 'Jaipur',
      category: 'Photography',
      imageUrl:
        'https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg',
    },
    {
      id: 13,
      title: 'Literature Lounge',
      date: 'Oct 20, 2025',
      location: 'Kolkata',
      category: 'Literature',
      imageUrl:
        'https://images.pexels.com/photos/5904937/pexels-photo-5904937.jpeg',
    },
    {
      id: 14,
      title: 'Tech Talk',
      date: 'Aug 20, 2025',
      location: 'Bangalore',
      category: 'Tech',
      imageUrl:
        'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
    },
    {
      id: 15,
      title: 'Design Jam',
      date: 'Sep 12, 2025',
      location: 'Mumbai',
      category: 'Design',
      imageUrl:
        'https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg',
    },
    {
      id: 16,
      title: 'Startup Insights',
      date: 'Oct 05, 2025',
      location: 'Hyderabad',
      category: 'Business',
      imageUrl:
        'https://images.pexels.com/photos/705443/pexels-photo-705443.jpeg',
    },
    // {
    //   "title": "AI Futures",
    //   "date": "Nov 18, 2025",
    //   "location": "Pune",
    //   "category": "Artificial Intelligence",
    //   "imageUrl": "https://images.pexels.com/photos/7432102/pexels-photo-7432102.jpeg"
    // },
    // {
    //   "title": "Code Carnival",
    //   "date": "Dec 10, 2025",
    //   "location": "Chennai",
    //   "category": "Programming",
    //   "imageUrl": "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
    // }
  ];



  // https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg/
  // https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg
  // https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg
  // Add more dummy events

  events = [...this.allevents]; // filtered list

  ngOnInit() {}

  onCategorySelect(category: string) {
    this.events =
      category === 'All'
        ? [...this.allevents]
        : this.allevents.filter((e) => e.category === category);
  }
}
