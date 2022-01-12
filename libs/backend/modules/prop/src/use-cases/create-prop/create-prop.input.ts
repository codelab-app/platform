import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreatePropInput {
  @Field()
  declare data: string
}
