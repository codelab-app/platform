import {
  IBaseTypeVertex,
  TypeKind,
  Vertex,
} from '@codelab/shared/abstract/core'
import { Field, ID, InterfaceType, registerEnumType } from '@nestjs/graphql'

registerEnumType(TypeKind, { name: 'TypeKind' })

@InterfaceType()
export class Type<TTypeKind extends TypeKind = TypeKind>
  implements Vertex, IBaseTypeVertex<TTypeKind>
{
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => TypeKind)
  declare typeKind: TTypeKind
}
