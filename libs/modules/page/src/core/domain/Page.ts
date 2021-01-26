import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType('Page')
export class Page {
  @Field({ nullable: true })
  declare id: string

  @Field()
  declare title: string
}
