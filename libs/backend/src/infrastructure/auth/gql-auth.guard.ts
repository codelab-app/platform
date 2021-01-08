import { ExecutionContext, Injectable } from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { AuthenticationError } from 'apollo-server-express'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    return super.canActivate(new ExecutionContextHost([req]))
  }

  handleRequest<User>(err: any, user: User, info: any, context: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      // throw err || new UnauthorizedException()
      throw err || new AuthenticationError(info)
    }

    return user
  }
}
