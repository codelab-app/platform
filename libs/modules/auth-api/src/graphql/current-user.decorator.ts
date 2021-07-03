import { JwtPayload } from '@codelab/backend/adapters'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'


/**
 * Can only be called if the GqlAuthGuard is applied
 */
export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  JwtPayload
>((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)

  return ctx.getContext().req.user
})
