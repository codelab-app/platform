import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetPropInput {
  @Field()
  declare propId: string
}
