import type { NestMiddleware } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import type { NextFunction, Request, Response } from 'express'
import { JwtAuthGuard } from './jwt/jwt-auth.guard'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly guard: JwtAuthGuard,
    private reflector: Reflector,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Requested Path:', req.path)

    const context = new ExecutionContextHost([req, res])

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await this.guard.canActivate(context)
    } catch (error) {
      throw new UnauthorizedException('Unauthorized')
    }

    next()
  }
}
