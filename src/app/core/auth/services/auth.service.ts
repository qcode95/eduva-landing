import { inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { RequestService } from '../../../shared/services/core/request/request.service';
import { ToastHandlingService } from '../../../shared/services/core/toast/toast-handling.service';

import { StatusCode } from '../../../shared/constants/status-code.constant';

import { type RegisterRequest } from '../../../shared/models/api/request/command/register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly requestService = inject(RequestService);
  private readonly toastService = inject(ToastHandlingService);

  // API URLs
  private readonly BASE_API_URL = environment.baseApiUrl;
  private readonly REGISTER_URL = `${this.BASE_API_URL}/auth/register`;
  private readonly CLIENT_URL = environment.clientUrl;

  private readonly isLoadingSignal = signal<boolean>(false);
  readonly isLoading = this.isLoadingSignal.asReadonly();

  register(request: RegisterRequest): Observable<void> {
    this.isLoadingSignal.set(true);

    const payload: RegisterRequest = {
      ...request,
      clientUrl: this.CLIENT_URL,
    };
    return this.requestService.post<void>(this.REGISTER_URL, payload).pipe(
      tap(res => {
        if (res.statusCode === StatusCode.SUCCESS) {
          this.toastService.success(
            'Đăng ký thành công',
            'Vui lòng kiểm tra email đã đăng ký để xác nhận!'
          );
        } else {
          this.toastService.errorGeneral();
          this.isLoadingSignal.set(false);
        }
      }),
      map(() => void 0),
      catchError(err => {
        this.handleRegisterError(err);
        this.isLoadingSignal.set(false);
        return of(void 0);
      })
    );
  }

  private handleRegisterError(err: HttpErrorResponse): void {
    const statusCode = err.error?.statusCode;

    switch (statusCode) {
      case StatusCode.EMAIL_ALREADY_EXISTS:
        this.toastService.error(
          'Đăng ký thất bại',
          'Email đã tồn tại. Vui lòng chọn email khác!'
        );
        break;

      default:
        this.toastService.errorGeneral();
    }
  }
}
