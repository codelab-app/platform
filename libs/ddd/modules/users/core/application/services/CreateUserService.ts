import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { CreateUserDto } from '../../domain/dtos/CreateUserDto'
import { User } from '../../domain/user'
import { CreateUserErrors } from '../useCases/createUser/CreateUserErrors'
import { CreateUserResponse } from '../useCases/createUser/CreateUserResponse'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { Result } from '@codelab/ddd/shared/core'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: CreateUserDto): Promise<CreateUserResponse> {
    // Check user doesn't exist
    const userAlreadyExists = await this.userRepository.exists(request)

    if (userAlreadyExists) {
      return left(Result.fail<CreateUserErrors.EmailAlreadyExistsError>())
    }

    const user = await User.create(request)

    return right(Result.ok(user))
  }
}
