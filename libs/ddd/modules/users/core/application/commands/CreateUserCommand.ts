import { CreateUserDto } from '../../domain/dtos/CreateUserDto'
import { UserEmail } from '../../domain/user-email'
import { UserPassword } from '../../domain/user-password'
import { CreateUserRequest } from '../useCases/createUser/CreateUserRequest'

// stackoverflow.com/questions/32216408/cqrs-commands-and-queries-do-they-belong-in-the-domain#:~:text=From%20a%20DDD%20strategic%20point,business%20concepts%20and%20use%20cases.&text=However%20all%20domain%20use%20cases,queries%20used%20by%20the%20domain.

export class CreateUserCommand implements CreateUserDto {
  email: UserEmail

  password: UserPassword

  constructor(request: CreateUserRequest) {
    const { email, password } = request

    this.email = new UserEmail({ value: email })
    this.password = new UserPassword({ value: password })
  }
}
