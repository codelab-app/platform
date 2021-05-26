import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

@ObjectType()
export class App {
  @Field(() => ID)
  declare id: string

  /** The id of the user that owns this App, taken from auth0 */
  @Field()
  declare ownerId: string

  @Field()
  declare name: string
}

export const appSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
})
