import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoComponent } from '../logo/logo.component';
import { FixedBarService } from '../fixed-bar.service';
import { GlobalModalService } from '../../../shared/layout/global-modal/global-modal.service';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-fixed-bar',
  standalone: true,
  imports: [LogoComponent, CommonModule],
  templateUrl: './fixed-bar.component.html',
  styleUrl: './fixed-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedBarComponent {
  showBar = signal(false);
  private readonly fixedBarService = inject(FixedBarService);
  private readonly globalModalService = inject(GlobalModalService);

  ngOnInit() {
    this.fixedBarService.showBar$.subscribe(show => this.showBar.set(show));
  }

  openSignUpModal() {
    this.globalModalService.open(SignUpModalComponent);
  }
}
