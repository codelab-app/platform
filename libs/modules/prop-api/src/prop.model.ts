import { ValueType } from '@codelab/modules/value-type-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Prop {
  @Field(() => ID)
  declare id: string

  @Field({ nullable: true })
  declare key: string

  @Field(() => ValueType)
  declare type: ValueType

  @Field({ nullable: true })
  declare description: string

  @Field(() => [Prop], { nullable: true })
  declare props: [Prop]
}
