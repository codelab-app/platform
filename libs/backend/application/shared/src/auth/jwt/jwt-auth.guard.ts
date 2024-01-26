import type { ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Request } from 'express'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * We use `APP_GUARD` which guards entire app, Nest.js doesn't offer a way to opt-out of a specific route, this seems the best way to omit a route from the auth guard.
   */
  private readonly publicRoutes: Array<string> = ['/api/healthcheck']

  private isPublicRoute(url: string) {
    return this.publicRoutes.includes(url)
  }

  override canActivate(context: ExecutionContext) {
    const { url } = context.switchToHttp().getRequest<Request>()

    return this.isPublicRoute(url) || super.canActivate(context)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleRequest(err: unknown, user: any, info: unknown) {
    console.log(user)

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      console.debug(err, user, info)
      throw err || new UnauthorizedException()
    }

    return user
  }
}
