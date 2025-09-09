import { Routes } from '@angular/router';

import { AuthFeatureShellContainerComponent } from './shell-container.component';
import { redirectIfAuthenticated } from '@nx-admin-starter/web-auth-data-access';

export const routes: Routes = [
  {
    path: '',
    component: AuthFeatureShellContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@nx-admin-starter/web-auth-feature-login').then(
            (m) => m.WebAuthFeatureLogin
          ),
        canActivate: [redirectIfAuthenticated],
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('@nx-admin-starter/web-auth-feature-login').then(
            (m) => m.WebAuthFeatureLogin
          ),
        canActivate: [redirectIfAuthenticated],
      },
    ],
  },
];
