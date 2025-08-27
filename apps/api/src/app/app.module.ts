import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiAuthModule } from '@api/auth';
import { ConfigModule } from '@nestjs/config';
import { CorePrismaModule } from '@api/core/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CorePrismaModule,
    ApiAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
