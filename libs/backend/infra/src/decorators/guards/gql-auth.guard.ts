import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

/**
 * Checks for user authentication only, doesn't account for role-based permissions
 */

const getRequest = (context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)

  return ctx.getContext().req
}

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return getRequest(context)
  }
}

@Injectable()
export class GqlAllEnvAuthGuard extends AuthGuard(['jwt', 'jwt_local']) {
  getRequest(context: ExecutionContext) {
    return getRequest(context)
  }
}
