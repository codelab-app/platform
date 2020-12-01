import { Field, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../database/typeorm/UserEntity'

@ObjectType()
export class User {
  @Field((returns) => UserEntity)
  declare user: UserEntity

  @Field()
  declare accessToken: string
}
