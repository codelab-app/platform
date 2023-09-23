import type { ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Request } from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    console.log(request.headers)

    return super.canActivate(context)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleRequest(err: unknown, user: any, info: unknown) {
    // console.log(err, user, info)

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    return user
  }
}
