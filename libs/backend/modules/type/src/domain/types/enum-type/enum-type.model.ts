import { IEnumTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '../type.model'
import { EnumTypeValue } from './enum-type-value.model'

/**
 * Allows only a set of values
 */
@ObjectType({ implements: () => [Type] })
export class EnumType implements Type<TypeKind.EnumType>, IEnumTypeVertex {
  declare id: string

  declare name: string

  typeKind: TypeKind.EnumType = TypeKind.EnumType

  @Field(() => [EnumTypeValue])
  declare allowedValues: Array<EnumTypeValue>

  constructor(id: string, name: string, allowedValues: Array<EnumTypeValue>) {
    this.id = id
    this.name = name
    this.allowedValues = allowedValues
  }
}
