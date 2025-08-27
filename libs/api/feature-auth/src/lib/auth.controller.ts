import { Controller, Get } from '@nestjs/common';
import { ApiFeatureAuthService } from './auth.service';

@Controller('auth')
export class ApiFeatureAuthController {
  constructor(private authService: ApiFeatureAuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }
}
