import { Module } from '@nestjs/common';
import { ApiFeatureAuthController } from './auth.controller';
import { ApiFeatureAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [ApiFeatureAuthController],
  providers: [ApiFeatureAuthService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [ApiFeatureAuthService],
})
export class ApiFeatureAuthModule {}
