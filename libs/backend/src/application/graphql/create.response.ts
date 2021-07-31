import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateResponse {
  @Field()
  declare id: string
}
