import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class App {
  @Field(() => ID)
  declare id: string

  /** Since we don't have Dgraph user model, we store the auth0 user id instead */
  @Field()
  declare ownerId: string

  @Field()
  declare name: string

  // This is implicit and its resolved in page-api/../AppPagesResolver to avoid circular dependencies
  // @Field(() => [Page])
  // declare pages?: Array<Page>

  constructor(id: string, ownerId: string, name: string) {
    this.id = id
    this.ownerId = ownerId
    this.name = name
  }
}
