import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

import { PinoLoggerService } from './pino'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: PinoLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Gets the request log
    this.logger.log('Request:', {
      // body: req.body,
      url: req.originalUrl,
    })

    next()
  }
}
