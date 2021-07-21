import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

type Auth0UserId = string

@ObjectType()
export class App {
  @Field(() => ID)
  declare id: string

  /** Since we don't have Dgraph user model, we store the auth0 user id instead */
  @Field()
  declare ownerId: Auth0UserId

  @Field()
  declare name: string
}

export const appSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  name: z.string(),
})
