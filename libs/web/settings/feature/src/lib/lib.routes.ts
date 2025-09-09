import { Route } from '@angular/router';

export const webSettingsFeatureRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./settings-profile/settings-profile.component').then(
        (m) => m.SettingsProfileComponent
      ),
  },
  {
    path: 'security',
    loadComponent: () =>
      import('./settings-security/settings-security.component').then(
        (m) => m.SettingsSecurityComponent
      ),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./settings-preferences/settings-preferences.component').then(
        (m) => m.SettingsPreferencesComponent
      ),
  },
];
