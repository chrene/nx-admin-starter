import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'web-shell-ui-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule],
  template: `
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white">
        <p-menu
          [model]="items"
          styleClass="w-full h-full border-0 bg-transparent text-white"
        ></p-menu>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-y-auto bg-gray-50">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class WebShellLayoutComponent {
  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Auth',
      icon: 'pi pi-user',
      items: [
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/auth/login' },
        {
          label: 'Reset Password',
          icon: 'pi pi-key',
          routerLink: '/auth/reset-password',
        },
      ],
    },
  ];
}
