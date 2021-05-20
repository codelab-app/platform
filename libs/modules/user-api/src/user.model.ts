import { Field, ObjectType } from '@nestjs/graphql'
import { User as Auth0User } from 'auth0'

//Note that we don't store the User model in the DB, we use the Auth0 management api to manage it
@ObjectType()
export class User implements Auth0User {
  //We can type and query app metadata if we need it too
  // app_metadata: AppMetadata

  @Field({ nullable: true })
  declare blocked?: boolean

  @Field({ nullable: true })
  declare created_at?: string

  @Field({ nullable: true })
  declare email?: string

  @Field({ nullable: true })
  declare email_verified?: boolean

  @Field({ nullable: true })
  declare family_name?: string

  @Field({ nullable: true })
  declare given_name?: string

  // @Field()
  // declare identities: Array<Identity>

  @Field({ nullable: true })
  declare last_ip?: string

  @Field({ nullable: true })
  declare last_login?: string

  @Field({ nullable: true })
  declare last_password_reset?: string

  @Field({ nullable: true })
  declare logins_count?: number

  @Field(() => [String], { nullable: true })
  declare multifactor?: Array<string>

  @Field({ nullable: true })
  declare name?: string

  @Field({ nullable: true })
  declare nickname?: string

  @Field({ nullable: true })
  declare phone_number?: string

  @Field({ nullable: true })
  declare phone_verified?: boolean

  @Field({ nullable: true })
  declare picture?: string

  @Field({ nullable: true })
  declare updated_at?: string

  @Field({ nullable: true })
  declare user_id?: string

  // @Field()
  // declare user_metadata: UserMetadata

  @Field({ nullable: true })
  declare username?: string
}
