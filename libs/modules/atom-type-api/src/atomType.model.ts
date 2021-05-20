import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AtomType {
  @Field(() => ID)
  declare id: string

  @Field()
  declare label: string

  @Field()
  declare type: string
}
