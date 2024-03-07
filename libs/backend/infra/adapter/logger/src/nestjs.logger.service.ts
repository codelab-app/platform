import { Injectable, Logger, type LoggerService } from '@nestjs/common'

@Injectable()
export class NestjsLoggerService extends Logger implements LoggerService {}
