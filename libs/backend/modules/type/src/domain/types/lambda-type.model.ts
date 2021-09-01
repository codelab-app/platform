import { ILambdaTypeVertex } from '@codelab/shared/core'
import { TypeKind } from '@codelab/shared/enums'
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
  implements ILambdaTypeVertex
{
  constructor({ id, name }: Pick<LambdaType, 'id' | 'name'>) {
    super(TypeKind.LambdaType)

    this.id = id
    this.name = name
  }
}
