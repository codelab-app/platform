import { UserEmail } from '../user-email'
import { UserPassword } from '../user-password'

export interface CreateUserDto {
  email: UserEmail
  password: UserPassword
}

// @ObjectType()
// export class UserDto {
//   @Field((returns) => UserEntity)
//   declare user: UserEntity

//   @Field()
//   declare accessToken: string
// }
