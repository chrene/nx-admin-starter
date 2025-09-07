import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@nx-admin-starter/web-auth-feature-shell').then((m) => m.routes),
  },
];
