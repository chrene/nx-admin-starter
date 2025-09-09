import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'VIEWER';
  createdAt: string;
  lastLogin?: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    CardModule,
    ToolbarModule,
    RouterModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
          <p class="text-gray-600 mt-1">Manage users and their permissions</p>
        </div>
        <p-button
          label="Add User"
          icon="pi pi-user-plus"
          routerLink="/users/create"
        ></p-button>
      </div>

      <!-- Users Table -->
      <p-card>
        <p-toolbar>
          <ng-template pTemplate="left">
            <h3 class="text-lg font-semibold">All Users</h3>
          </ng-template>
          <ng-template pTemplate="right">
            <p-button
              icon="pi pi-refresh"
              severity="secondary"
              size="small"
              (click)="refreshUsers()"
            ></p-button>
          </ng-template>
        </p-toolbar>

        <p-table
          [value]="users"
          [loading]="loading"
          [paginator]="true"
          [rows]="10"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          styleClass="p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-user>
            <tr>
              <td class="font-medium">{{ user.email }}</td>
              <td>
                <p-tag
                  [value]="user.role"
                  [severity]="getRoleSeverity(user.role)"
                ></p-tag>
              </td>
              <td>{{ user.createdAt | date : 'short' }}</td>
              <td>
                {{
                  user.lastLogin ? (user.lastLogin | date : 'short') : 'Never'
                }}
              </td>
              <td>
                <div class="flex gap-2">
                  <p-button
                    icon="pi pi-pencil"
                    severity="secondary"
                    size="small"
                    [routerLink]="['/users/edit', user.id]"
                  ></p-button>
                  <p-button
                    icon="pi pi-trash"
                    severity="danger"
                    size="small"
                    (click)="deleteUser(user)"
                  ></p-button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="5" class="text-center py-8 text-gray-500">
                No users found
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
})
export class UsersListComponent {
  loading = false;
  users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      role: 'ADMIN',
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      email: 'manager@example.com',
      role: 'MANAGER',
      createdAt: '2024-01-02T00:00:00Z',
      lastLogin: '2024-01-14T15:45:00Z',
    },
    {
      id: '3',
      email: 'viewer@example.com',
      role: 'VIEWER',
      createdAt: '2024-01-03T00:00:00Z',
    },
  ];

  getRoleSeverity(role: string): string {
    switch (role) {
      case 'ADMIN':
        return 'danger';
      case 'MANAGER':
        return 'warning';
      case 'VIEWER':
        return 'info';
      default:
        return 'secondary';
    }
  }

  refreshUsers() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  deleteUser(user: User) {
    // TODO: Implement delete functionality
    console.log('Delete user:', user);
  }
}
