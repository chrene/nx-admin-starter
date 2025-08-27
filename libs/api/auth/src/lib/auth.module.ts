import { Module } from '@nestjs/common';
import { ApiAuthController } from './auth.controller';
import { ApiAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [ApiAuthController],
  providers: [ApiAuthService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [ApiAuthService],
})
export class ApiAuthModule {}
