import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { GlobalModalService } from '../../shared/layout/global-modal/global-modal.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const globalModalService = inject(GlobalModalService);

  const handleServerError = () => {
    globalModalService.close();
    router.navigateByUrl('/errors/500');
  };

  const handleForbidden = () => {
    globalModalService.close();
    router.navigateByUrl('/errors/403');
  };

  const handleNotFound = () => {
    globalModalService.close();
    router.navigateByUrl('/errors/404');
  };

  const handleTooManyRequest = (error: HttpErrorResponse) => {
    globalModalService.close();

    let waitTimeMinutes = 1;

    const requestUrl = error.url || '';

    if (requestUrl.includes('/auth')) {
      waitTimeMinutes = 10;
    } else if (requestUrl.includes('/ai-jobs')) {
      waitTimeMinutes = 1;
    }

    if (waitTimeMinutes <= 0) {
      waitTimeMinutes = 1;
    } else if (waitTimeMinutes > 1440) {
      waitTimeMinutes = 60;
    }

    router.navigateByUrl(`/errors/429?waitTime=${waitTimeMinutes}`);
  };

  const handleErrorByStatusCode = (error: HttpErrorResponse) => {
    const status = error.status;

    // Server errors
    if (status === 0 || status >= 500) {
      handleServerError();
    }

    // Forbidden
    if (status === 403) {
      handleForbidden();
    }

    // Not found
    if (status === 404) {
      handleNotFound();
    }

    // Too many request
    if (status === 429) {
      handleTooManyRequest(error);
    }
  };

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleErrorByStatusCode(error);
      return throwError(() => error);
    })
  );
};
