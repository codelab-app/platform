import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field()
  id: string

  @Field()
  name: string

  constructor({ id, name }: Tag) {
    this.id = id
    this.name = name
  }
}
