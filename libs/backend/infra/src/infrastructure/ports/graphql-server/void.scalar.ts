import { CustomScalar, Scalar } from '@nestjs/graphql'

@Scalar('Void')
export class Void implements CustomScalar<null, void> {
  description = 'Date custom scalar type'

  parseValue() {
    //
  }

  serialize() {
    return null
  }

  parseLiteral() {
    //
  }
}
