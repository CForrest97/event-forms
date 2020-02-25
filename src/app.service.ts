import { Injectable } from '@nestjs/common';
@Injectable()
export default class AppService {
  async getHealthCheck() {
    return 'health check';
  }
}
