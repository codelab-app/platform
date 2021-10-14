import {
  IPrimitiveTypeVertex,
  PrimitiveKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '../type.model'

/**
 * A wrapper for a PrimitiveKind. It's needed because
 * we can't directly reference the PrimitiveKind, we have to reference a 'object instance' instead
 */
@ObjectType({
  implements: () => [Type],
})
export class PrimitiveType
  extends Type<TypeKind.PrimitiveType>
  implements IPrimitiveTypeVertex
{
  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind

  constructor({
    id,
    name,
    primitiveKind,
    tags,
  }: Pick<PrimitiveType, 'id' | 'name' | 'primitiveKind' | 'tags'>) {
    super(TypeKind.PrimitiveType)

    this.tags = tags
    this.id = id
    this.name = name
    this.primitiveKind = primitiveKind
  }
}
