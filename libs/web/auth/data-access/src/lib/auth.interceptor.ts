// libs/web/data-access-auth/src/lib/auth.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(AuthStore);
  const t = store.tokens$.value;
  const clone = t?.accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${t.accessToken}` } })
    : req;
  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        store.refresh$.next();
        const nt = store.tokens$.value;
        if (!nt?.accessToken) return throwError(() => err);
        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${nt.accessToken}` },
          })
        );
      }
      return throwError(() => err);
    })
  );
};
