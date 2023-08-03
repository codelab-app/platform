import { User } from '@codelab/backend/domain/user'
import type { Auth0SessionUser, IUserDTO } from '@codelab/shared/abstract/core'
import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  IUserDTO
>((data: unknown, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx)

  // Check if it's a GraphQL execution context
  if (gqlContext.getContext().req && gqlContext.getContext().res) {
    return gqlContext.getContext().user
  }

  // Otherwise assume it's a CLI execution context
  const httpContext = ctx.switchToHttp().getRequest()
  const userSession = httpContext.user as Auth0SessionUser

  return User.fromSession(userSession)
})
