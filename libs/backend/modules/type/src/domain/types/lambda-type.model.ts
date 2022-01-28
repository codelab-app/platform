import { ILambdaType, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

/**
 * The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The LambdaType allows selecting a Lambda in the props form. The value is stored as the lambdaId ',
})
export class LambdaType
  extends Type<TypeKind.LambdaType>
  implements ILambdaType
{
  constructor(type: Omit<LambdaType, 'typeKind'>) {
    super({ typeKind: TypeKind.LambdaType, ...type })
  }
}
