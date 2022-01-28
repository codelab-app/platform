import {
  ElementTypeKind,
  IElementType,
  TypeKind,
} from '@codelab/shared/abstract/core'
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
  extends Type<TypeKind.ElementType>
  implements IElementType
{
  @Field(() => ElementTypeKind)
  declare elementKind: ElementTypeKind

  constructor({ elementKind, ...type }: Omit<ElementType, 'typeKind'>) {
    super({ typeKind: TypeKind.ElementType, ...type })

    this.elementKind = elementKind
  }
}
