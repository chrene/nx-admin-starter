import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Subject,
  tap,
  switchMap,
  catchError,
  of,
} from 'rxjs';

export type User = { sub: string; role: string; email?: string };
export type Tokens = { accessToken: string; refreshToken?: string };

const KEY = 'auth_tokens';
const storage = {
  get(): Tokens | null {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set(tokens: Tokens) {
    localStorage.setItem(KEY, JSON.stringify(tokens));
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private http = inject(HttpClient);
  private base = '/api';

  // state
  readonly user$ = new BehaviorSubject<User | null>(null);
  readonly tokens$ = new BehaviorSubject<Tokens | null>(storage.get());
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);
  readonly isAuthed$ = this.tokens$.pipe(map((t) => !!t?.accessToken));

  // effects triggers
  readonly login$ = new Subject<{ email: string; password: string }>();
  readonly refresh$ = new Subject<void>();
  readonly logout$ = new Subject<void>();

  constructor() {
    // login effect
    this.login$
      .pipe(
        tap(() => {
          this.loading$.next(true);
          this.error$.next(null);
        }),
        switchMap(({ email, password }) =>
          this.http
            .post<Tokens>(`${this.base}/auth/login`, { email, password })
            .pipe(
              tap((t) => {
                storage.set(t);
                this.tokens$.next(t);
              }),
              switchMap(() => this.http.get<User>(`${this.base}/auth/me`)),
              tap((u) => this.user$.next(u)),
              catchError((err) => {
                this.error$.next(err?.error?.message || 'Login failed');
                return of(null);
              }),
              tap(() => this.loading$.next(false))
            )
        )
      )
      .subscribe();

    // refresh effect
    this.refresh$
      .pipe(
        switchMap(() => {
          const t = this.tokens$.value;
          if (!t?.refreshToken) {
            // No refresh token available, clear everything
            this.logout$.next();
            return of(null);
          }

          return this.http
            .post<Tokens>(
              `${this.base}/auth/refresh`,
              {},
              {
                headers: { Authorization: `Bearer ${t.refreshToken}` },
              }
            )
            .pipe(
              tap((nt) => {
                if (nt) {
                  storage.set(nt);
                  this.tokens$.next(nt);
                } else {
                  console.warn('Refresh returned empty response');
                }
              }),
              catchError((err) => {
                console.error('Refresh failed:', err);
                // Refresh failed, logout user
                this.logout$.next();
                return of(null);
              })
            );
        })
      )
      .subscribe();

    // logout effect
    this.logout$
      .pipe(
        tap(() => {
          storage.clear();
          this.tokens$.next(null);
          this.user$.next(null);
        })
      )
      .subscribe();
  }
}
