import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UpsertPropsResponse {
  @Field()
  declare ok: boolean
}
