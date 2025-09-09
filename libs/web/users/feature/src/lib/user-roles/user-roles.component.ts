import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

interface Role {
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    ToolbarModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">User Roles</h1>
          <p class="text-gray-600 mt-1">Manage user roles and permissions</p>
        </div>
        <p-button
          label="Add Role"
          icon="pi pi-plus"
          (click)="addRole()"
        ></p-button>
      </div>

      <!-- Roles Table -->
      <p-card>
        <p-toolbar>
          <ng-template pTemplate="left">
            <h3 class="text-lg font-semibold">Available Roles</h3>
          </ng-template>
          <ng-template pTemplate="right">
            <p-button
              icon="pi pi-refresh"
              severity="secondary"
              size="small"
              (click)="refreshRoles()"
            ></p-button>
          </ng-template>
        </p-toolbar>

        <p-table
          [value]="roles"
          [loading]="loading"
          styleClass="p-datatable-sm"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>Role</th>
              <th>Description</th>
              <th>Permissions</th>
              <th>Users</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-role>
            <tr>
              <td>
                <div class="flex items-center gap-2">
                  <p-tag
                    [value]="role.name"
                    [severity]="getRoleSeverity(role.name)"
                  ></p-tag>
                </div>
              </td>
              <td class="text-gray-600">{{ role.description }}</td>
              <td>
                <div class="flex flex-wrap gap-1">
                  <p-tag
                    *ngFor="let permission of role.permissions"
                    [value]="permission"
                    severity="info"
                    styleClass="text-xs"
                  ></p-tag>
                </div>
              </td>
              <td>
                <span class="font-medium">{{ role.userCount }}</span>
              </td>
              <td>
                <div class="flex gap-2">
                  <p-button
                    icon="pi pi-pencil"
                    severity="secondary"
                    size="small"
                    (click)="editRole(role)"
                  ></p-button>
                  <p-button
                    icon="pi pi-trash"
                    severity="danger"
                    size="small"
                    (click)="deleteRole(role)"
                    [disabled]="role.userCount > 0"
                  ></p-button>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>

      <!-- Role Permissions Info -->
      <p-card>
        <h3 class="text-lg font-semibold mb-4">Role Permissions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <h4 class="font-medium text-gray-900">Admin</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Full system access</li>
              <li>• User management</li>
              <li>• System settings</li>
              <li>• All data access</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="font-medium text-gray-900">Manager</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• User management (limited)</li>
              <li>• Data viewing and editing</li>
              <li>• Report generation</li>
              <li>• Team management</li>
            </ul>
          </div>
          <div class="space-y-2">
            <h4 class="font-medium text-gray-900">Viewer</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Read-only access</li>
              <li>• View reports</li>
              <li>• Basic data viewing</li>
              <li>• No modifications</li>
            </ul>
          </div>
        </div>
      </p-card>
    </div>
  `,
})
export class UserRolesComponent {
  loading = false;
  roles: Role[] = [
    {
      name: 'ADMIN',
      description: 'Full administrative access to all system features',
      permissions: [
        'user_management',
        'system_settings',
        'data_access',
        'reports',
      ],
      userCount: 1,
    },
    {
      name: 'MANAGER',
      description: 'Management access with limited administrative privileges',
      permissions: ['user_management', 'data_access', 'reports'],
      userCount: 1,
    },
    {
      name: 'VIEWER',
      description: 'Read-only access to system data and reports',
      permissions: ['data_access', 'reports'],
      userCount: 1,
    },
  ];

  getRoleSeverity(roleName: string): string {
    switch (roleName) {
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

  refreshRoles() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  addRole() {
    // TODO: Implement add role functionality
    console.log('Add new role');
  }

  editRole(role: Role) {
    // TODO: Implement edit role functionality
    console.log('Edit role:', role);
  }

  deleteRole(role: Role) {
    // TODO: Implement delete role functionality
    console.log('Delete role:', role);
  }
}
