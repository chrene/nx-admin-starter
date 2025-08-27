import { Module } from '@nestjs/common';
import { ApiFeatureAuthController } from './auth.controller';
import { ApiFeatureAuthService } from './auth.service';

@Module({
  controllers: [ApiFeatureAuthController],
  providers: [ApiFeatureAuthService],
  exports: [ApiFeatureAuthService],
})
export class ApiFeatureAuthModule {}
