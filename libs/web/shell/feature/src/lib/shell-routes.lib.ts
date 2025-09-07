import { Routes } from '@angular/router';
import { authGuard } from '@nx-admin-starter/web-auth-data-access';

import { WebFeatureShellContainerComponent } from './shell-container.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@nx-admin-starter/web-auth-feature-shell').then((m) => m.routes),
  },
  {
    path: '',
    component: WebFeatureShellContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'reset-password',
    redirectTo: 'auth/reset-password',
  },
];
