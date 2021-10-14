import { Tag } from '@codelab/backend/modules/tag'
import {
  IBaseTypeVertex,
  TypeKind,
  Vertex,
} from '@codelab/shared/abstract/core'
import { Field, ID, InterfaceType, registerEnumType } from '@nestjs/graphql'

registerEnumType(TypeKind, { name: 'TypeKind' })

@InterfaceType({ isAbstract: true })
export class Type<TTypeKind extends TypeKind>
  implements Vertex, IBaseTypeVertex
{
  @Field(() => TypeKind)
  typeKind: TTypeKind

  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => [Tag], { nullable: true })
  declare tags?: Array<Tag>

  constructor(typeKind: TTypeKind) {
    this.typeKind = typeKind
  }
}
