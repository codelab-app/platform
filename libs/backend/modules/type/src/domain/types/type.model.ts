import { Vertex } from '@codelab/shared/abstract/core'
import { IBaseTypeVertex } from '@codelab/shared/core'
import { TypeKind } from '@codelab/shared/enums'
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

  constructor(typeKind: TTypeKind) {
    this.typeKind = typeKind
  }
}
