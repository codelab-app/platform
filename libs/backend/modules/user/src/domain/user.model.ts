import { IUser, Role } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

registerEnumType(Role, { name: 'Role' })

@ObjectType()
export class User implements IUser {
  // We can type and query app metadata if we need it too
  // app_metadata: AppMetadata

  @Field(() => ID)
  declare id: string

  @Field()
  declare auth0Id: string

  @Field(() => [Role])
  declare roles: Array<Role>

  constructor({ id, auth0Id, roles }: User) {
    this.id = id
    this.auth0Id = auth0Id
    this.roles = roles
  }

  // @Field({ nullable: true })
  // declare blocked?: boolean
  //
  // @Field({ nullable: true })
  // declare created_at?: string
  //
  // @Field({ nullable: true })
  // declare email?: string
  //
  // @Field({ nullable: true })
  // declare email_verified?: boolean
  //
  // @Field({ nullable: true })
  // declare family_name?: string
  //
  // @Field({ nullable: true })
  // declare given_name?: string
  //
  // // @Field()
  // // declare identities: Array<Identity>
  //
  // @Field({ nullable: true })
  // declare last_ip?: string
  //
  // @Field({ nullable: true })
  // declare last_login?: string
  //
  // @Field({ nullable: true })
  // declare last_password_reset?: string
  //
  // @Field({ nullable: true })
  // declare logins_count?: number
  //
  // @Field(() => [String], { nullable: true })
  // declare multifactor?: Array<string>
  //
  // @Field({ nullable: true })
  // declare name?: string
  //
  // @Field({ nullable: true })
  // declare nickname?: string
  //
  // @Field({ nullable: true })
  // declare phone_number?: string
  //
  // @Field({ nullable: true })
  // declare phone_verified?: boolean
  //
  // @Field({ nullable: true })
  // declare picture?: string
  //
  // @Field({ nullable: true })
  // declare updated_at?: string
  //
  // @Field({ nullable: true })
  // declare user_id?: string
  //
  // // @Field()
  // // declare user_metadata: UserMetadata
  //
  // @Field({ nullable: true })
  // declare username?: string
}
