import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  constructor({ id, name }: Tag) {
    this.id = id
    this.name = name
  }
}
