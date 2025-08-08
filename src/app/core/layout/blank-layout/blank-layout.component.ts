import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ThemeService } from '../../../shared/services/core/theme/theme.service';

import { GlobalModalHostComponent } from '../../../shared/components/global-modal-host/global-modal-host.component';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    ConfirmDialogModule,
    ScrollTopModule,
    GlobalModalHostComponent,
  ],
  template: `
    <router-outlet />

    <button
      class="fixed right-5 top-5 z-10 transition-colors duration-100 ease-linear hover:text-primary md:right-[25px] md:top-[25px]"
      (click)="toggleTheme()">
      <i class="material-symbols-outlined !text-xl md:!text-[22px]">
        {{ isDarkMode() ? 'light_mode' : 'dark_mode' }}
      </i>
    </button>

    <app-global-modal-host />

    <p-toast />
    <p-confirmDialog [baseZIndex]="1000" [closeOnEscape]="true" />
    <p-scrolltop
      icon="pi pi-arrow-up"
      [buttonProps]="{ raised: true, rounded: true }" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {
  private readonly themeService = inject(ThemeService);

  theme = this.themeService.theme;

  readonly isDarkMode = computed(() => this.theme() === 'dark');

  toggleTheme() {
    this.theme() === 'light'
      ? this.themeService.setTheme('dark')
      : this.themeService.setTheme('light');
  }
}
