import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx)

    // Check if it's a GraphQL execution context
    if (gqlContext.getContext().req && gqlContext.getContext().res) {
      return gqlContext.getContext().user
    }

    // Otherwise assume it's a CLI execution context
    const cliContext = ctx.switchToHttp().getRequest().cliContext

    return cliContext.get('user')
  },
)
