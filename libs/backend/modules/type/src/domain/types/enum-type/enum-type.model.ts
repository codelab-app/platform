import { IEnumTypeVertex, TypeKind } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '../type.model'
import { EnumTypeValue } from './enum-type-value.model'

/**
 * Allows only a set of values
 */
@ObjectType({ implements: () => [Type] })
export class EnumType
  extends Type<TypeKind.EnumType>
  implements IEnumTypeVertex
{
  @Field(() => [EnumTypeValue])
  declare allowedValues: Array<EnumTypeValue>

  constructor({
    id,
    name,
    allowedValues,
    tags,
  }: Pick<EnumType, 'id' | 'name' | 'allowedValues' | 'tags'>) {
    super(TypeKind.EnumType)

    this.tags = tags
    this.id = id
    this.name = name
    this.allowedValues = allowedValues
  }
}
