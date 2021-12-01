import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Prop')
export class Prop {
  @Field(() => ID)
  declare id: string

  @Field()
  declare data: string

  constructor(id: string, data: string) {
    this.id = id
    this.data = data
  }
}
