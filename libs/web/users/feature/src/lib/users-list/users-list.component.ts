import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { UsersService, User } from '@nx-admin-starter/web-users-data-access';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
  ],
  template: `
    <p-toast></p-toast>
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
  providers: [MessageService],
})
export class UsersListComponent implements OnInit {
  private usersService = inject(UsersService);
  private messageService = inject(MessageService);
  
  loading = false;
  users: User[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load users'
        });
        this.loading = false;
      }
    });
  }

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
    this.loadUsers();
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted successfully'
          });
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete user'
          });
        }
      });
    }
  }
}
