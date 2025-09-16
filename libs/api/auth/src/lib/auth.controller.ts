import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiAuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { User } from './decorators/user.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('auth')
export class ApiAuthController {
  constructor(private auth: ApiAuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const u = await this.auth.validate(body.email, body.password);
    return {
      accessToken: this.auth.signAccessToken({ id: u.id, role: u.role }),
      refreshToken: this.auth.signRefreshToken({ id: u.id, role: u.role }),
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@User() user: { sub: string; role: Role }) {
    return this.auth.refreshTokens(user.sub);
  }

  @UseGuards(JwtAccessGuard)
  @Get('me')
  me(@User() user: unknown) {
    return user;
  }

  @UseGuards(JwtAccessGuard)
  @Roles(Role.ADMIN)
  @Get('admin-check')
  adminOnly() {
    return { ok: true };
  }
}
