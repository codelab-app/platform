import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

/**
 * Allows only logged in users
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }

  // canActivate(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context)
  //   const { req } = ctx.getContext()

  //   console.log(req.headers)

  //   return super.canActivate(new ExecutionContextHost([req]))
  // }

  // handleRequest(err: any, user: any) {
  //   console.log(err, user)

  //   if (err || !user) {
  //     throw err || new AuthenticationError('GqlAuthGuard')
  //   }

  //   return user
  // }
}
