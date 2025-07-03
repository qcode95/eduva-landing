import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-difference',
  standalone: true,
  imports: [],
  templateUrl: './difference.component.html',
  styleUrl: './difference.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferenceComponent {}
