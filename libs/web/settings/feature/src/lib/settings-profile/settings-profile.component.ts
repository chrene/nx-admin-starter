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
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-settings-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
  ],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p class="text-gray-600 mt-1">Manage your profile information</p>
      </div>

      <!-- Profile Form -->
      <p-card>
        <form
          [formGroup]="profileForm"
          (ngSubmit)="onSubmit()"
          class="space-y-6"
        >
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              pInputText
              id="email"
              formControlName="email"
              placeholder="user@example.com"
              class="w-full"
              readonly
            />
            <p class="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <!-- First Name -->
          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              pInputText
              id="firstName"
              formControlName="firstName"
              placeholder="Enter first name"
              class="w-full"
            />
          </div>

          <!-- Last Name -->
          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              pInputText
              id="lastName"
              formControlName="lastName"
              placeholder="Enter last name"
              class="w-full"
            />
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4">
            <p-button
              label="Save Changes"
              type="submit"
              [disabled]="profileForm.invalid || loading"
              [loading]="loading"
            ></p-button>
            <p-button
              label="Cancel"
              severity="secondary"
              (click)="resetForm()"
            ></p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
})
export class SettingsProfileComponent {
  profileForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['admin@example.com', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.loading = true;
      // TODO: Implement profile update
      console.log('Updating profile:', this.profileForm.value);

      // Simulate API call
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  }

  resetForm() {
    this.profileForm.reset({
      email: 'admin@example.com',
      firstName: '',
      lastName: '',
    });
  }
}
