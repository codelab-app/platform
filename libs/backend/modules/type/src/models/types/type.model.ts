import { IBaseTypeVertex, IVertex, TypeKind } from '@codelab/shared/graph'
import { Field, ID, InterfaceType, registerEnumType } from '@nestjs/graphql'

registerEnumType(TypeKind, { name: 'TypeKind' })

@InterfaceType()
export class Type<TTypeKind extends TypeKind = TypeKind>
  implements IVertex, IBaseTypeVertex<TTypeKind>
{
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => TypeKind)
  declare typeKind: TTypeKind
}
