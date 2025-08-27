import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiFeatureAuthService {
  getData() {
    return { message: 'Hello from ApiFeatureAuthService' };
  }
}
