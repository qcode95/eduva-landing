import {
  ChangeDetectionStrategy,
  Component,
  input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonType = 'primary' | 'rounded' | 'text' | 'outline';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  text = input.required<string>();
  buttonType = input<string>('button');
  type = input.required<ButtonType | ButtonType[]>();
  loading = input<boolean>(false);

  @Output() clickEvent = new EventEmitter<Event>();

  get typeList(): ButtonType[] {
    const value = this.type();
    return Array.isArray(value) ? value : [value];
  }

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
