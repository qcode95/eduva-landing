import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent {

}
