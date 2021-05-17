import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class App {
  @Field((type) => ID)
  declare id: string

  @Field()
  declare name: string
}
