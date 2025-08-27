import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiFeatureAuthModule } from '@admin-starter/api-feature-auth';

@Module({
  imports: [ApiFeatureAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
