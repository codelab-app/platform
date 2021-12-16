import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UpdatePropInput {
  @Field()
  declare id: string

  @Field()
  declare data: string
}
