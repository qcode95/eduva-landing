import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/landing-page/landing-page.component').then(
        mod => mod.LandingPageComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
