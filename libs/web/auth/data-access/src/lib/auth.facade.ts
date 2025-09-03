import { Injectable, inject } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private store = inject(AuthStore);
  // selectors
  user$ = this.store.user$;
  isAuthed$ = this.store.isAuthed$;
  loading$ = this.store.loading$;
  error$ = this.store.error$;
  // commands
  login(email: string, password: string) {
    this.store.login$.next({ email, password });
  }
  logout() {
    this.store.logout$.next();
  }
  triggerRefresh() {
    this.store.refresh$.next();
  }
}
