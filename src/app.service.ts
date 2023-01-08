import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
