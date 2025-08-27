import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiAuthModule } from '@admin-starter/api-auth';

@Module({
  imports: [ApiAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
