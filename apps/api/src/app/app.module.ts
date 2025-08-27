import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@api/auth';
import { ConfigModule } from '@nestjs/config';
import { CorePrismaModule } from '@api/core/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CorePrismaModule,
    ApiAuthModule,
  ],
})
export class AppModule {}
