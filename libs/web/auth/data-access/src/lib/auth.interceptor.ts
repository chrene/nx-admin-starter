// libs/web/data-access-auth/src/lib/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { catchError, throwError, switchMap, filter, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const t = store.tokens$.value;

  // Add access token to request if available (but not to refresh endpoint)
  const clone =
    t?.accessToken && !req.url.includes('/auth/refresh')
      ? req.clone({ setHeaders: { Authorization: `Bearer ${t.accessToken}` } })
      : req;

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.url.includes('/auth/refresh')) {
        // Don't retry refresh endpoint calls
        const currentToken = store.tokens$.value?.accessToken;

        // Trigger refresh
        store.refresh$.next();

        // Wait for token to change (either new token or null after logout)
        return store.tokens$.pipe(
          filter((tokens) => tokens?.accessToken !== currentToken),
          take(1),
          switchMap((newTokens) => {
            if (newTokens?.accessToken) {
              // Retry with new token
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newTokens.accessToken}`,
                  },
                })
              );
            } else {
              // No new token (logout happened), throw original error
              return throwError(() => err);
            }
          })
        );
      }
      return throwError(() => err);
    })
  );
};
