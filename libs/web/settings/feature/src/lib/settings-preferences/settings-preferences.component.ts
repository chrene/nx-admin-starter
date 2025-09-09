import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-settings-preferences',
  standalone: true,
  imports: [CommonModule, CardModule],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Preferences</h1>
        <p class="text-gray-600 mt-1">Customize your application preferences</p>
      </div>

      <p-card>
        <div class="text-center py-8">
          <i class="pi pi-sliders-h text-4xl text-gray-400 mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            User Preferences
          </h3>
          <p class="text-gray-600">User preferences will be implemented here</p>
        </div>
      </p-card>
    </div>
  `,
})
export class SettingsPreferencesComponent {}
