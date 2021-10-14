import { IUnionTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from './type.model'

@ObjectType({
  implements: () => [Type],
})
export class UnionType
  extends Type<TypeKind.UnionType>
  implements IUnionTypeVertex
{
  @Field(() => [String])
  declare typeIdsOfUnionType: Array<string>

  constructor({
    id,
    name,
    typeIdsOfUnionType,
    tags,
  }: Pick<UnionType, 'id' | 'name' | 'typeIdsOfUnionType' | 'tags'>) {
    super(TypeKind.UnionType)

    this.tags = tags
    this.id = id
    this.name = name
    this.typeIdsOfUnionType = typeIdsOfUnionType
  }
}
