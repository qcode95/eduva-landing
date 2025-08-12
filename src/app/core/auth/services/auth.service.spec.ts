// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError, firstValueFrom, defer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { RequestService } from '../../../shared/services/core/request/request.service';
import { ToastHandlingService } from '../../../shared/services/core/toast/toast-handling.service';
import { StatusCode } from '../../../shared/constants/status-code.constant';
import { environment } from '../../../../environments/environment';
import type { RegisterRequest } from '../../../shared/models/api/request/command/register-request.model';

describe('AuthService (Vitest)', () => {
  let service: AuthService;

  const requestServiceMock = {
    post: vi.fn(),
  };

  const toastMock = {
    success: vi.fn(),
    warn: vi.fn(),
    errorGeneral: vi.fn(),
  };

  const sampleRequest: RegisterRequest = {
    email: 'test@example.com',
    fullName: 'Test User',
    password: 'StrongP@ssw0rd!',
  } as RegisterRequest;

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: RequestService, useValue: requestServiceMock },
        { provide: ToastHandlingService, useValue: toastMock },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register() sets isLoading true immediately and false after complete (success path)', async () => {
    requestServiceMock.post.mockReturnValueOnce(
      defer(() => of({ statusCode: StatusCode.SUCCESS }))
    );

    const obs$ = service.register(sampleRequest);
    expect(service.isLoading()).toBe(true);

    const result = await firstValueFrom(obs$);
    expect(result).toBeUndefined();

    expect(service.isLoading()).toBe(false);
    expect(toastMock.success).toHaveBeenCalledTimes(1);
    expect(toastMock.errorGeneral).not.toHaveBeenCalled();
  });

  it('register() sends payload with clientUrl appended', async () => {
    requestServiceMock.post.mockImplementationOnce(
      (url: string, payload: any) => {
        expect(payload.clientUrl).toBe(`${environment.clientUrl}/auth/login`);
        expect(payload.email).toBe(sampleRequest.email);
        return of({ statusCode: StatusCode.SUCCESS });
      }
    );

    await firstValueFrom(service.register(sampleRequest));
    expect(requestServiceMock.post).toHaveBeenCalledTimes(1);
  });

  it('register() shows general error toast when statusCode != SUCCESS', async () => {
    requestServiceMock.post.mockReturnValueOnce(of({ statusCode: 999999 }));

    await firstValueFrom(service.register(sampleRequest));
    expect(toastMock.errorGeneral).toHaveBeenCalledTimes(1);
    expect(toastMock.success).not.toHaveBeenCalled();
  });

  it('register() handles EMAIL_ALREADY_EXISTS with warn toast and rethrows error', async () => {
    const httpError = new HttpErrorResponse({
      status: 400,
      error: { statusCode: StatusCode.EMAIL_ALREADY_EXISTS },
    });

    requestServiceMock.post.mockReturnValueOnce(throwError(() => httpError));

    await expect(firstValueFrom(service.register(sampleRequest))).rejects.toBe(
      httpError
    );

    expect(toastMock.warn).toHaveBeenCalledTimes(1);
    expect(toastMock.errorGeneral).not.toHaveBeenCalled();
    expect(service.isLoading()).toBe(false);
  });

  it('register() handles unknown error with general error toast and rethrows', async () => {
    const httpError = new HttpErrorResponse({
      status: 500,
      error: { statusCode: 123456 },
    });

    requestServiceMock.post.mockReturnValueOnce(throwError(() => httpError));

    await expect(firstValueFrom(service.register(sampleRequest))).rejects.toBe(
      httpError
    );

    expect(toastMock.errorGeneral).toHaveBeenCalledTimes(1);
    expect(toastMock.warn).not.toHaveBeenCalled();
    expect(service.isLoading()).toBe(false);
  });
});
