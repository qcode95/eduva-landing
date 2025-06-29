import { inject, Injectable, signal } from '@angular/core';
import { RequestService } from '../request/request.service';
import { ToastHandlingService } from '../toast/toast-handling.service';
import { environment } from '../../../../../environments/environment';
import { RegisterRequest } from '../../../models/api/request/command/register-request.model';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { StatusCode } from '../../../constants/status-code.constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly requestService = inject(RequestService);
  private readonly toastService = inject(ToastHandlingService);

  // API URLs
  private readonly REGISTER_URL = `${environment.baseApiUrl}/auth/register`;

  private readonly isLoadingSignal = signal<boolean>(false);
  readonly isLoading = this.isLoadingSignal.asReadonly();

  register(request: RegisterRequest): Observable<void> {
    this.isLoadingSignal.set(true);
    return this.requestService.post<void>(this.REGISTER_URL, request).pipe(
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
