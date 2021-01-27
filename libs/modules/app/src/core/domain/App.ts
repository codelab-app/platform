import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('App')
export class App {
  @Field()
  declare id: string

  @Field()
  declare title: string
}
