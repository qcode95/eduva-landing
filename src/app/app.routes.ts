import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing-page/landing-page.component').then(
        mod => mod.LandingPageComponent
      ),
  },
  {
    path: 'errors',
    loadChildren: () =>
      import('./shared/pages/errors/errors.routes').then(
        mod => mod.errorRoutes
      ),
  },
  { path: '**', redirectTo: '/errors/404' },
];
