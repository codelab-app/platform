import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GetPageOwnerResponse {
  @Field()
  declare ownerId?: string
}
