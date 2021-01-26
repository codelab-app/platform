import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('App')
export class App {
  @Field({ nullable: true })
  declare id: string

  @Field()
  declare title: string
}
