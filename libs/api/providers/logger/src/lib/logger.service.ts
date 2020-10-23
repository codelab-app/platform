import { Injectable } from '@nestjs/common'
import * as logger from 'fluent-logger'

@Injectable()
export class LoggerService extends logger {
  getData(): { message: string } {
    return { message: 'Welcome to user!' }
  }
}
