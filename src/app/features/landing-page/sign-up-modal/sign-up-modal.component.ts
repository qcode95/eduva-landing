import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/auth/services/auth.service';
import { GlobalModalService } from '../../../shared/layout/global-modal/global-modal.service';

import { isFormFieldMismatch } from '../../../shared/utils/util-functions';
import {
  customEmailValidator,
  strongPasswordValidator,
} from '../../../shared/utils/form-validators';

import { FormControlComponent } from '../../../shared/components/form-control/form-control.component';
import { ButtonComponent } from '../button/button.component';

import { type RegisterRequest } from '../../../shared/models/api/request/command/register-request.model';
import { VIETNAM_PHONE_REGEX } from '../../../shared/constants/common.constant';

@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [
    FormControlComponent,
    CommonModule,
    FormsModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-modal.component.html',
  styleUrl: './sign-up-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly globalModalService = inject(GlobalModalService);

  readonly isLoading = this.authService.isLoading;

  form!: FormGroup;

  submitted = signal<boolean>(false);

  readonly passwordValue = signal<string>('');
  readonly passwordLevel = signal<number | undefined>(undefined);
  readonly passwordStrengthLabel = signal<string>('');

  constructor() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', customEmailValidator],
      password: ['', [Validators.required, strongPasswordValidator]],
      confirmPassword: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(VIETNAM_PHONE_REGEX)],
      ],
    });

    this.form.get('password')?.valueChanges.subscribe(value => {
      this.passwordValue.set(value ?? '');

      const level = this.calcPasswordLevel(value ?? '');
      this.passwordLevel.set(level);

      if (!level || level < 1) {
        this.passwordStrengthLabel.set('');
      } else if (level === 5) {
        this.passwordStrengthLabel.set('Mật khẩu mạnh');
      } else if (level === 4) {
        this.passwordStrengthLabel.set('Mật khẩu trung bình');
      } else {
        this.passwordStrengthLabel.set('Mật khẩu yếu');
      }
    });
  }

  get passwordMisMatch() {
    return isFormFieldMismatch(this.form, 'password');
  }

  closeModal() {
    this.globalModalService.close();
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const req: RegisterRequest = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      password: this.form.value.password,
      phoneNumber: this.form.value.phoneNumber,
      confirmPassword: this.form.value.confirmPassword,
    };

    this.authService.register(req).subscribe(() => this.closeModal());
  }

  private calcPasswordLevel(password: string): number | undefined {
    if (!password) return undefined;

    let level = 0;
    if (password.length >= 6) level++;
    if (/[a-z]/.test(password)) level++;
    if (/[A-Z]/.test(password)) level++;
    if (/\d/.test(password)) level++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) level++;
    return level;
  }
}
