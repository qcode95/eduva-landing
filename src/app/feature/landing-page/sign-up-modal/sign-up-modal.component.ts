import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormControlComponent } from '../../../shared/components/form-control/form-control.component';
import { GlobalModalService } from '../../../shared/layout/global-modal/global-modal.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [FormControlComponent, CommonModule, FormsModule, ButtonComponent],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpModalComponent {
  private readonly globalModalService = inject(GlobalModalService);

  name = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');
  otp = signal<string>('');

  readonly passwordLevel = computed(() => {
    let level = 0;

    if (this.password().length >= 6) {
      level++;
    }
    if (/[a-z]/.test(this.password())) {
      level++;
    }
    if (/[A-Z]/.test(this.password())) {
      level++;
    }
    if (/\d/.test(this.password())) {
      level++;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(this.password())) {
      level++;
    }
    if (this.password()) {
      return level;
    } else return;
  });

  closeModal() {
    this.globalModalService.close();
  }
}
