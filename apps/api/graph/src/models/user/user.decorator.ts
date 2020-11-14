import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CreateUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()

    return req.body.input.user
  },
)
