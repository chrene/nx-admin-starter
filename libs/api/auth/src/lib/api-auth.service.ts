import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiAuthService {
  getData() {
    return { message: 'Hello from ApiAuthService' };
  }
}
