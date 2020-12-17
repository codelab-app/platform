import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { CreateUserErrors } from '../useCases/createUser/CreateUserErrors'
import { CreateUserRequest } from '../useCases/createUser/CreateUserRequest'
import { CreateUserResponse } from '../useCases/createUser/CreateUserResponse'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { Result } from '@codelab/backend'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = User.create(request)

    const userAlreadyExists = await this.userRepository.exists({
      email: user.email.toString(),
    })

    if (userAlreadyExists) {
      return left(
        new CreateUserErrors.EmailAlreadyExistsError(user.email.toString()),
      )
    }

    const persistedUser = await this.userRepository.createUser(user)

    return right(Result.ok(persistedUser))
  }
}
