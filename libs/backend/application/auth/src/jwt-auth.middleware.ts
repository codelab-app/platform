import type { NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ObjectLike } from '@codelab/shared/abstract/types'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'

import { JwtAuthGuard } from './jwt/jwt-auth.guard'

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly guard: JwtAuthGuard,
    private readonly loggerService: PinoLoggerService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const context = new ExecutionContextHost([req, res, next])

    try {
      /**
       * This is causing error `secret or public key must be provided`
       */
      await this.guard.canActivate(context)
    } catch (error) {
      this.loggerService.error('Unauthorized', error as ObjectLike)
      throw new UnauthorizedException('Unauthorized')
    }

    next()
  }
}
