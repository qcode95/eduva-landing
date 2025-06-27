import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  LOCALE_ID,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import localeVi from '@angular/common/locales/vi';

import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';

import { MyPreset } from './my-preset';

registerLocaleData(localeVi);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.dark',
          cssLayer: false,
        },
      },
    }),
    { provide: LOCALE_ID, useValue: 'vi' },
  ],
};
