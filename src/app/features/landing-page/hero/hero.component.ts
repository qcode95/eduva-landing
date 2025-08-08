import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { FixedBarService } from '../fixed-bar.service';
import { GlobalModalService } from '../../../shared/layout/global-modal/global-modal.service';

import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly router = inject(Router);
  private readonly fixedBarService = inject(FixedBarService);
  private readonly globalModalService = inject(GlobalModalService);

  readonly btnGroup = viewChild.required<ElementRef>('btnGroup');

  ngAfterViewInit() {
    window.addEventListener('scroll', this.checkPosition);
  }

  checkPosition = () => {
    const rect = this.btnGroup().nativeElement.getBoundingClientRect();
    this.fixedBarService.showBar$.next(rect.bottom < 0);
  };

  openSignUpModal() {
    this.globalModalService.open(SignUpModalComponent);
  }

  navigateToComingSoon() {
    this.router.navigateByUrl('/errors/coming-soon');
  }
}
