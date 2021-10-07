import { IUnionTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

@ObjectType({
  implements: () => [Type],
})
export class UnionType
  extends Type<TypeKind.UnionType>
  implements IUnionTypeVertex
{
  constructor({ id, name }: Pick<UnionType, 'id' | 'name'>) {
    super(TypeKind.UnionType)

    this.id = id
    this.name = name
  }
}
