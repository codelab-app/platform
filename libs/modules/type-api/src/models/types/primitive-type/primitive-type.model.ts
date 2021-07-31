import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '../type.model'
import { PrimitiveKind } from './primitive-kind.model'

/**
 * A wrapper for a PrimitiveKind. It's needed because
 * we can't directly reference the PrimitiveKind, we have to reference a 'object instance' instead
 */
@ObjectType({
  implements: () => [Type],
})
export class PrimitiveType implements Type {
  declare id: string

  declare name: string

  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind

  constructor(id: string, name: string, primitiveKind: PrimitiveKind) {
    this.id = id
    this.name = name
    this.primitiveKind = primitiveKind
  }
}
