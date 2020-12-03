import { CreateUserRequest } from '../../application/useCases/createUser/CreateUserRequest'
import { UserEmail } from '../user-email'
import { UserPassword } from '../user-password'

export class CreateUserDto implements CreateUserRequest {
  declare email: UserEmail

  declare password: UserPassword

  // public static new(request: CreateUserRequest) {
  //   this.email
  // }
}
