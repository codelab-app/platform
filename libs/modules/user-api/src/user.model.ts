import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  declare id: string

  @Field()
  declare email: string

  @Field()
  declare name: string
  //Need to add those as well when we implement them
  // apps: [App!] @hasInverse(field: "owner")
  // libraries: [Library!] @hasInverse(field: "owner")
}
