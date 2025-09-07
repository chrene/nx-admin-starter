import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@web/shell/feature').then((m) => m.routes),
  },
];
