import { Route } from '@angular/router';

export const webUsersFeatureRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./users-list/users-list.component').then(
        (m) => m.UsersListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./user-create/user-create.component').then(
        (m) => m.UserCreateComponent
      ),
  },
  {
    path: 'roles',
    loadComponent: () =>
      import('./user-roles/user-roles.component').then(
        (m) => m.UserRolesComponent
      ),
  },
];
