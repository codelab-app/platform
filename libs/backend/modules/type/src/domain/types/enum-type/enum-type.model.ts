import { IEnumType, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '../type.model'
import { EnumTypeValue } from './enum-type-value.model'

/**
 * Allows only a set of values
 */
@ObjectType({ implements: () => [Type] })
export class EnumType extends Type<TypeKind.EnumType> implements IEnumType {
  @Field(() => [EnumTypeValue])
  declare allowedValues: Array<EnumTypeValue>

  constructor({ allowedValues, ...type }: Omit<EnumType, 'typeKind'>) {
    super({ typeKind: TypeKind.EnumType, ...type })

    this.allowedValues = allowedValues
  }
}
