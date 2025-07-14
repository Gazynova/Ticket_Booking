import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-divider',
  imports: [],
  templateUrl: './section-divider.component.html',
  styleUrl: './section-divider.component.css'
})
export class SectionDividerComponent {
 @Input() title: string = '';
}
