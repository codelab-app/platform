import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string
}
