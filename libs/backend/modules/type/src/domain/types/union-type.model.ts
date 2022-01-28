import { ObjectRef } from '@codelab/backend/abstract/core'
import { IUnionType, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

@ObjectType({
  implements: () => [Type],
})
export class UnionType extends Type<TypeKind.UnionType> implements IUnionType {
  @Field(() => [ObjectRef])
  declare typesOfUnionType: Array<ObjectRef>

  constructor({ typesOfUnionType, ...type }: Omit<UnionType, 'typeKind'>) {
    super({ typeKind: TypeKind.UnionType, ...type })

    this.typesOfUnionType = typesOfUnionType
  }
}
