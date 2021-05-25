import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageElementLink {
  @Field({ description: 'The id of the source PageElement' })
  declare from: string

  @Field({ description: 'The id of the target PageElement' })
  declare to: string

  @Field(() => Int)
  declare order: number

  constructor(from: string, to: string, order: number) {
    this.from = from
    this.to = to
    this.order = order
  }
}
