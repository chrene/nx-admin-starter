import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@web/shell').then((m) => m.routes),
  },
];
