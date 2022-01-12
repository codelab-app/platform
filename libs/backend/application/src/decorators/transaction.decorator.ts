import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Transaction = createParamDecorator(
  (_data, context: ExecutionContext) => {
    const httpContext = context.switchToHttp()

    const req =
      httpContext.getRequest() ??
      GqlExecutionContext.create(context).getContext().req

    return req.transaction
  },
)
