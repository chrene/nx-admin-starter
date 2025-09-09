import { Routes } from '@angular/router';
import { authGuard } from '@nx-admin-starter/web-auth-data-access';
import { WebShellLayoutComponent } from '@nx-admin-starter/web-shell-ui';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@nx-admin-starter/web-auth-feature-shell').then((m) => m.routes),
  },
  {
    path: '',
    component: WebShellLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@nx-admin-starter/web-dashboard-feature').then(
            (m) => m.WebDashboardFeature
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@nx-admin-starter/web-users-feature').then(
            (m) => m.webUsersFeatureRoutes
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@nx-admin-starter/web-settings-feature').then(
            (m) => m.webSettingsFeatureRoutes
          ),
      },
    ],
  },
  { path: 'reset-password', redirectTo: 'auth/reset-password' },
];
