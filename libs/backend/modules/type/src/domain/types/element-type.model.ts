import {
  ElementTypeKind,
  IElementTypeVertex,
  TypeKind,
} from '@codelab/shared/graph'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Type } from './type.model'

registerEnumType(ElementTypeKind, { name: 'ElementTypeKind' })

/**
 * The ElementType allows selecting a Element in the props form. The value is stored as the elementId
 */
@ObjectType({
  implements: () => [Type],
  description:
    'The ElementType allows selecting an Element in the props form. The value is stored as the elementId ',
})
export class ElementType
  implements Type<TypeKind.ElementType>, IElementTypeVertex
{
  declare id: string

  declare name: string

  typeKind: TypeKind.ElementType = TypeKind.ElementType

  @Field(() => ElementTypeKind)
  declare kind: ElementTypeKind

  constructor(id: string, name: string, kind: ElementTypeKind) {
    this.id = id
    this.name = name
    this.kind = kind
  }
}
