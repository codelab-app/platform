import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  email: string

  constructor(id: string, email: string) {
    this.id = id
    this.email = email
  }

  //Need to add those as well when we implement them
  // apps: [App!] @hasInverse(field: "owner")
  // libraries: [Library!] @hasInverse(field: "owner")
}
