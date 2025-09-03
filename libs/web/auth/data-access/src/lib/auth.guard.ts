// libs/web/data-access-auth/src/lib/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthFacade } from './auth.facade';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);
  return auth.isAuthed$.pipe(
    take(1),
    map((ok) => {
      if (ok) return true;
      router.navigate(['/auth/login'], {
        queryParams: { r: location.pathname },
      });
      return false;
    })
  );
};
