import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetLastOrderChildResponse {
  @Field()
  declare lastOrderChildId: string

  @Field(() => Int)
  declare order: number

  constructor(lastOrderChildId: string, order: number) {
    this.lastOrderChildId = lastOrderChildId
    this.order = order
  }
}
