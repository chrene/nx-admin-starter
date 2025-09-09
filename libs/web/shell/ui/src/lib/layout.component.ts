import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthFacade } from '@nx-admin-starter/web-auth-data-access';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'web-shell-ui-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule, ButtonModule, AsyncPipe],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside
        class="w-72 bg-white shadow-lg border-r border-gray-200 flex flex-col"
      >
        <!-- Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <i class="pi pi-building text-white text-lg"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Admin Panel</h1>
              <p class="text-sm text-gray-500">Management System</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex-1 p-4">
          <p-menu
            [model]="items"
            styleClass="w-full border-0 bg-transparent"
          ></p-menu>
        </div>

        <!-- User Section -->
        <div class="p-4 border-t border-gray-200">
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center"
            >
              <i class="pi pi-user text-white text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ (authFacade.user$ | async)?.email || 'User' }}
              </p>
              <p class="text-xs text-gray-500">
                {{ (authFacade.user$ | async)?.role || 'Admin' }}
              </p>
            </div>
          </div>
          <p-button
            label="Logout"
            icon="pi pi-sign-out"
            severity="secondary"
            size="small"
            class="w-full"
            (click)="onLogout()"
          ></p-button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class WebShellLayoutComponent {
  readonly authFacade = inject(AuthFacade);

  items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
      styleClass: 'mb-2',
    },
    {
      label: 'User Management',
      icon: 'pi pi-users',
      items: [
        {
          label: 'All Users',
          icon: 'pi pi-list',
          routerLink: '/users',
          styleClass: 'mb-1',
        },
        {
          label: 'Add User',
          icon: 'pi pi-user-plus',
          routerLink: '/users/create',
          styleClass: 'mb-1',
        },
        {
          label: 'User Roles',
          icon: 'pi pi-shield',
          routerLink: '/users/roles',
          styleClass: 'mb-1',
        },
      ],
      styleClass: 'mb-2',
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user-edit',
          routerLink: '/settings/profile',
          styleClass: 'mb-1',
        },
        {
          label: 'Security',
          icon: 'pi pi-lock',
          routerLink: '/settings/security',
          styleClass: 'mb-1',
        },
        {
          label: 'Preferences',
          icon: 'pi pi-sliders-h',
          routerLink: '/settings/preferences',
          styleClass: 'mb-1',
        },
      ],
      styleClass: 'mb-2',
    },
  ];

  onLogout() {
    this.authFacade.logout();
  }
}
