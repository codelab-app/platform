import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class App {
  @Field(() => ID)
  declare id: string

  /** The id of the user that owns this App, taken from auth0 */
  @Field()
  declare ownerId: string

  @Field()
  declare name: string

  // pages: [Page] @hasInverse(field: "app")
}
