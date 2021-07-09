import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'An edge between two element nodes' })
export class ElementLink {
  @Field({ description: 'The id of the source Element' })
  declare from: string

  @Field({ description: 'The id of the target Element' })
  declare to: string

  @Field(() => Int)
  declare order: number

  constructor(from: string, to: string, order: number) {
    this.from = from
    this.to = to
    this.order = order
  }
}
