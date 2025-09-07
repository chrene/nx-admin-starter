import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@nx-admin-starter/web-shell-feature').then((m) => m.routes),
  },
];
