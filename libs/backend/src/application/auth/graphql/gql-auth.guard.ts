import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)

    return ctx.getContext().req
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
