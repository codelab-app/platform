import {
  IPrimitiveType,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Type } from './type.model'

registerEnumType(PrimitiveTypeKind, {
  name: 'PrimitiveTypeKind',
})

/**
 * A wrapper for a PrimitiveKind. It's needed because
 * we can't directly reference the PrimitiveKind, we have to reference a 'object instance' instead
 */
@ObjectType({
  implements: () => [Type],
})
export class PrimitiveType
  extends Type<TypeKind.PrimitiveType>
  implements IPrimitiveType
{
  @Field(() => PrimitiveTypeKind)
  declare primitiveKind: PrimitiveTypeKind

  constructor({ primitiveKind, ...type }: Omit<PrimitiveType, 'typeKind'>) {
    super({ typeKind: TypeKind.PrimitiveType, ...type })
    this.primitiveKind = primitiveKind
  }
}
