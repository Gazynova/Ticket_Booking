import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  imports: [NgClass,CommonModule],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
@Input() theme: 
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'success'     // ✅ Green (checkout / success actions)
  | 'confirm'     // ✅ Modern emerald tone
  | 'info'        // ✅ Blue (general actions)
  | 'warning'     // ✅ Yellow (alerts / cautions)
  | 'special'     // ✅ Purple (premium/special actions)
  | 'none' 
  = 'primary';
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
