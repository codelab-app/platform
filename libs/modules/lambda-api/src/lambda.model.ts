import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Lambda {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field()
  declare body: string
}
