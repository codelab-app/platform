import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import type { ExecutionContext } from '@nestjs/common'

import { User } from '@codelab/backend/domain/user'
import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator<unknown, ExecutionContext>(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx)

    // Check if it's a GraphQL execution context
    if (gqlContext.getContext().req && gqlContext.getContext().res) {
      return gqlContext.getContext().user
    }

    // Otherwise assume it's a CLI execution context
    const httpContext = ctx.switchToHttp().getRequest()
    const userSession = httpContext.user as Auth0IdToken

    return User.fromSession(userSession)
  },
)
