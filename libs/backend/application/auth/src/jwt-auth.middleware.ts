import type { ExecutionContext, NestMiddleware } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import type { NextFunction, Request, Response } from 'express'
import { JwtAuthGuard } from './jwt/jwt-auth.guard'

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly guard: JwtAuthGuard) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Requested Path:', req.path)

    const context = new ExecutionContextHost([req, res, next])

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /**
       * This is causing error `secret or public key must be provided`
       */
      await this.guard.canActivate(context)
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Unauthorized')
    }

    next()
  }
}
