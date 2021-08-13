import { IEnumTypeValue } from '@codelab/shared/graph'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class EnumTypeValue implements IEnumTypeValue {
  @Field(() => ID)
  declare id: string

  @Field(() => String, { nullable: true })
  declare name?: string | null

  @Field(() => String)
  declare value: string

  constructor(id: string, name: string | null, value: string) {
    this.id = id
    this.name = name
    this.value = value
  }
}
