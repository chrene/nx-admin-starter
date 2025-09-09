import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    SelectButtonModule,
    ButtonModule,
    RouterModule,
    MessageModule,
  ],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Create New User</h1>
        <p class="text-gray-600 mt-1">Add a new user to the system</p>
      </div>

      <!-- Form -->
      <p-card>
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address *
            </label>
            <input
              pInputText
              id="email"
              formControlName="email"
              placeholder="user@example.com"
              class="w-full"
              [class.ng-invalid]="
                userForm.get('email')?.invalid && userForm.get('email')?.touched
              "
            />
            <p-message
              *ngIf="
                userForm.get('email')?.invalid && userForm.get('email')?.touched
              "
              severity="error"
              text="Please enter a valid email address"
            ></p-message>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Password *
            </label>
            <p-password
              id="password"
              formControlName="password"
              placeholder="Enter password"
              [toggleMask]="true"
              [feedback]="true"
              class="w-full"
              [class.ng-invalid]="
                userForm.get('password')?.invalid &&
                userForm.get('password')?.touched
              "
            ></p-password>
            <p-message
              *ngIf="
                userForm.get('password')?.invalid &&
                userForm.get('password')?.touched
              "
              severity="error"
              text="Password must be at least 6 characters long"
            ></p-message>
          </div>

          <!-- Role -->
          <div>
            <label
              for="role"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Role *
            </label>
            <p-selectButton
              id="role"
              formControlName="role"
              [options]="roleOptions"
              class="w-full"
              [class.ng-invalid]="
                userForm.get('role')?.invalid && userForm.get('role')?.touched
              "
            ></p-selectButton>
            <p-message
              *ngIf="
                userForm.get('role')?.invalid && userForm.get('role')?.touched
              "
              severity="error"
              text="Please select a role"
            ></p-message>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4">
            <p-button
              label="Create User"
              type="submit"
              [disabled]="userForm.invalid || loading"
              [loading]="loading"
            ></p-button>
            <p-button
              label="Cancel"
              severity="secondary"
              routerLink="/users"
            ></p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
})
export class UserCreateComponent {
  userForm: FormGroup;
  loading = false;

  roleOptions = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Manager', value: 'MANAGER' },
    { label: 'Viewer', value: 'VIEWER' },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      // TODO: Implement user creation
      console.log('Creating user:', this.userForm.value);

      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        // Navigate back to users list
      }, 2000);
    }
  }
}
