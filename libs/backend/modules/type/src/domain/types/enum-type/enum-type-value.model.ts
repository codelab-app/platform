import { IEnumTypeValue } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EnumTypeValue implements IEnumTypeValue {
  @Field(() => ID)
  declare id: string

  @Field(() => String, { nullable: true })
  declare name?: Nullable<string>

  @Field(() => String)
  declare value: string

  constructor({ id, name = '', value }: EnumTypeValue) {
    this.id = id
    this.name = name
    this.value = value
  }
}
