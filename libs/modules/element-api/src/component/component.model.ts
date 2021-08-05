import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Component {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
