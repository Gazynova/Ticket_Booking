import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports:[NgIf],
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit {
  eventId: number = 0;
  event: any;

  allEvents = [
    {
      id: 1,
      title: 'Jazz Night',
      category: 'Music',
      date: '2025-08-01',
      location: 'Mumbai',
      imageUrl: 'https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg',
      description: 'A soulful night of jazz with top Indian musicians.',
    },
    {
      id: 2,
      title: 'Rock Fest',
      category: 'Music',
      date: '2025-09-10',
      location: 'Delhi',
      imageUrl: 'https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg',
      description: 'Feel the energy of the ultimate rock music experience!',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.paramMap.subscribe((params) => {
    //   const idParam = params.get('id');
    //   this.eventId = idParam ? parseInt(idParam, 10) : 0;
    //   this.event = this.allEvents.find((e) => e.id === this.eventId);
    // });

    this.eventId = history.state.eventid
    this.event = this.allEvents.find((e) => e.id === this.eventId);

  }

}
