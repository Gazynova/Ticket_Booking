import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mock-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mock-email.component.html'
})
export class MockEmailComponent {
  @Input() order: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
