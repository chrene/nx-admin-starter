import { Routes } from '@angular/router';

import { AuthFeatureShellContainerComponent } from './shell-container.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthFeatureShellContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
    ],
  },
];
