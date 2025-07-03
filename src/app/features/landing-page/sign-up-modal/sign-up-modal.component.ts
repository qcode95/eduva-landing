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
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/auth/services/auth.service';
import { GlobalModalService } from '../../../shared/layout/global-modal/global-modal.service';

import { FormControlComponent } from '../../../shared/components/form-control/form-control.component';
import { ButtonComponent } from '../button/button.component';

import { type RegisterRequest } from '../../../shared/models/api/request/command/register-request.model';

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

  passwordLevel = signal<number | undefined>(undefined);

  constructor() {
    this.form = this.fb.group({
      fullName: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      phoneNumber: [''],
    });

    this.form.get('password')!.valueChanges.subscribe((password: string) => {
      this.passwordLevel.set(this.calcPasswordLevel(password));
    });
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
}
