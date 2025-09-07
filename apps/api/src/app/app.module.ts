import { Module } from '@nestjs/common';
import { ApiAuthModule } from '@nx-admin-starter/api-auth';
import { ConfigModule } from '@nestjs/config';
import { CorePrismaModule } from '@nx-admin-starter/api-core-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CorePrismaModule,
    ApiAuthModule,
  ],
})
export class AppModule {}
