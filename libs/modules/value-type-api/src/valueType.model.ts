import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ValueType {
  @Field(() => ID)
  declare id: string

  @Field()
  declare label: string

  @Field()
  declare type: string
}
