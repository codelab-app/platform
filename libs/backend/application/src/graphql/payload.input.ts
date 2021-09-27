import { Field, InputType } from '@nestjs/graphql'

/**
 * Generally used for importing data, creating an input type would be overly complicated since the data are usually nested.
 */
@InputType()
export class BasePayloadInput {
  @Field()
  declare payload: string
}
