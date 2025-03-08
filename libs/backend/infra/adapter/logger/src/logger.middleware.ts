import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common'
import { RouteInfo } from '@nestjs/common/interfaces'
import { NextFunction, Request, Response } from 'express'
import { request } from 'http'

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
