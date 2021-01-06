import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    return super.canActivate(new ExecutionContextHost([req]))
  }

  handleRequest(err: any, user: any, info: any) {
    console.log(err, user)

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    return user
  }
}
