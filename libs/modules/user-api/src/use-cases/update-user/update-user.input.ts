import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserData {
  @Field({ nullable: true })
  declare family_name?: string

  @Field({ nullable: true })
  declare given_name?: string

  @Field({ nullable: true })
  declare name?: string

  @Field({ nullable: true })
  declare nickname?: string

  @Field({ nullable: true })
  declare phone_number?: string

  @Field({ nullable: true })
  declare picture?: string

  // @Field()
  //should be able to update user metadata when we implement that
  //(but not app_metadata, this should be update only by an admin or in the auth0 dashboard)
  // declare user_metadata: UserMetadata

  @Field({ nullable: true })
  declare username?: string
}

@InputType()
export class UpdateUserInput {
  @Field()
  declare userId: string

  @Field(() => UpdateUserData)
  declare updateData: UpdateUserData
}
