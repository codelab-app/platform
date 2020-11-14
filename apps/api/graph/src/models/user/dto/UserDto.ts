import { Field, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../user.entity'

@ObjectType()
export class UserDto {
  @Field((returns) => UserEntity)
  declare user: UserEntity

  @Field()
  declare accessToken: string
}
