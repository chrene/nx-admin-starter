import { Controller, Get } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';

@Controller('auth')
export class ApiAuthController {
  constructor(private apiAuthService: ApiAuthService) {}

  @Get()
  getData() {
    return this.apiAuthService.getData();
  }
}
