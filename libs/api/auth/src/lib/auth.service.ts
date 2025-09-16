import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class ApiAuthService {
  constructor(private jwt: JwtService, private prisma: PrismaClient) {}

  async validate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await argon2.verify(user.passwordHash, password)))
      throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  signAccessToken(user: { id: string; role: Role }) {
    return this.jwt.sign(
      { sub: user.id, role: user.role },
      { secret: process.env['JWT_SECRET'], expiresIn: '15m' }
    );
  }

  signRefreshToken(user: { id: string; role: Role }) {
    return this.jwt.sign(
      { sub: user.id, role: user.role },
      { secret: process.env['JWT_REFRESH_SECRET'], expiresIn: '7d' }
    );
  }

  async refreshTokens(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      accessToken: this.signAccessToken({ id: user.id, role: user.role }),
      refreshToken: this.signRefreshToken({ id: user.id, role: user.role }),
    };
  }
}
