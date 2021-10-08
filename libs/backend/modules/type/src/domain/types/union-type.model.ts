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
  /**
   * TODON
   * typeIdsOfUnionType: array string
   *   @Field(() => array<string>)
  typeIdsOfUnionType id: string

  assign constructor
   */
  @Field(() => [String])
  declare typeIdsOfUnionType: Array<string>

  constructor({
    id,
    name,
    typeIdsOfUnionType,
  }: Pick<UnionType, 'id' | 'name' | 'typeIdsOfUnionType'>) {
    super(TypeKind.UnionType)

    this.id = id
    this.name = name
    this.typeIdsOfUnionType = typeIdsOfUnionType
  }
}
