// libs/web/data-access-auth/src/lib/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
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

export const redirectIfAuthenticated: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  return store.tokens$.pipe(
    map((tokens) => {
      if (tokens?.accessToken) {
        // already logged in -> redirect to home
        return router.createUrlTree(['/']);
      }
      return true; // allow navigation to /auth/login
    })
  );
};
