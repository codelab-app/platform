import { Field, ObjectType } from '@nestjs/graphql'

/**
 * Used for exporting any kinds of json data
 */
@ObjectType()
export class PayloadResponse {
  @Field()
  declare payload: string
}
