import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiFeatureAuthModule } from '@api/feature-auth';
import { ConfigModule } from '@nestjs/config';
import { CorePrismaModule } from '@api/core/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CorePrismaModule,
    ApiFeatureAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
