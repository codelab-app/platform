import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class IsOwnerAuthGuard<TInput> extends AuthGuard('jwt') {
  constructor(
    private extractOwnerIdFromArgs: (input: TInput) => string | Promise<string>,
  ) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)

    return ctx.getContext().req
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const ownerIdFromInput = await this.extractOwnerIdFromArgs(ctx.getArgs())
    const { req } = ctx.getContext()
    const loggedInUserId = req.user.sub

    return ownerIdFromInput === loggedInUserId
  }
}
