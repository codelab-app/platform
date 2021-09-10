import type { User } from '@codelab/shared/abstract/core'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

/**
 * Can only be called if the GqlAuthGuard is applied
 */
export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  const user: User = ctx.getContext().req.user

  return user
})
