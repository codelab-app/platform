import type { IUser } from '@codelab/shared/abstract/core'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

/**
 * Can only be called if the GqlAuthGuard is applied
 */
export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  IUser
>((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  const user: IUser = ctx.getContext().req.user

  return user
})
