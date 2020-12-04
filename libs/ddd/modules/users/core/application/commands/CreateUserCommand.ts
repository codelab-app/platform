import { CreateUserDto } from '../../domain/dtos/CreateUserDto'
import { UserEmail } from '../../domain/user-email'
import { UserPassword } from '../../domain/user-password'
import { CreateUserRequest } from '../useCases/createUser/CreateUserRequest'

export class CreateUserCommand implements CreateUserDto {
  email: UserEmail

  password: UserPassword

  constructor(public readonly request: CreateUserRequest) {
    const { email, password } = request

    this.email = new UserEmail({ value: email })
    this.password = new UserPassword({ value: password })
  }
}
