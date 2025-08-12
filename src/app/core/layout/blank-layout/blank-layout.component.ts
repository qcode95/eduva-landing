import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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

    <app-global-modal-host />

    <p-toast />
    <p-confirmDialog [baseZIndex]="1000" [closeOnEscape]="true" />
    <p-scrolltop
      icon="pi pi-arrow-up"
      [buttonProps]="{ raised: true, rounded: true }" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {}
