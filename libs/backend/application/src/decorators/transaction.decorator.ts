import { createParamDecorator } from '@nestjs/common'

export const Transaction: () => ParameterDecorator = () => {
  return createParamDecorator((_data, req) => {
    return req.transaction
  })
}
