// libs/web/data-access-auth/src/lib/auth.guard.ts
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from './auth.facade';
import { map, take } from 'rxjs';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);
  return auth.isAuthed$.pipe(
    take(1),
    map((ok) => {
      console.log('authGuard', ok);
      if (ok) return true;
      router.navigate(['/auth/login'], {
        queryParams: { r: location.pathname },
      });
      return false;
    })
  );
};

export const redirectIfAuthenticated: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const store = inject(AuthStore);
  const router = inject(Router);

  return store.tokens$.pipe(
    map((tokens) => {
      if (tokens?.accessToken) {
        // Check if this is the reset-password route
        const isResetPassword = route.routeConfig?.path === 'reset-password';

        if (!isResetPassword) {
          // already logged in and not on reset-password -> redirect to home
          return router.createUrlTree(['/']);
        }
      }
      return true; // allow navigation to auth routes
    })
  );
};
