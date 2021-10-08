import { IUnionType, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

@ObjectType({
  implements: () => [Type],
})
export class UnionType extends Type<TypeKind.UnionType> implements IUnionType {
  @Field(() => [String])
  declare typeIdsOfUnionType: Array<string>

  constructor({
    id,
    name,
    typeIdsOfUnionType,
  }: Pick<UnionType, 'id' | 'name' | 'typeIdsOfUnionType'>) {
    super(TypeKind.UnionType)

    this.id = id
    this.typeIdsOfUnionType = typeIdsOfUnionType
    this.name = name
  }
}
