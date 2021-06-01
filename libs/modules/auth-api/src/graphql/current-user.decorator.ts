import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtPayload } from '../interfaces/jwt.interface'

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
