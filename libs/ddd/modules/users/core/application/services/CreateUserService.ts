import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { CreateUserErrors } from '../useCases/createUser/CreateUserErrors'
import { CreateUserRequest } from '../useCases/createUser/CreateUserRequest'
import { CreateUserResponse } from '../useCases/createUser/CreateUserResponse'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { Result } from '@codelab/ddd/shared/core'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Check user doesn't exist
    const userAlreadyExists = await this.userRepository.exists(request)

    if (userAlreadyExists) {
      return left(Result.fail<CreateUserErrors.EmailAlreadyExistsError>())
    }

    const user = await User.hydrate(request)

    return right(Result.ok(''))
  }
}
