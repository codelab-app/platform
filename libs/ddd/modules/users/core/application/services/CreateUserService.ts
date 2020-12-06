import { classToPlain } from 'class-transformer'
import { left, right } from 'fp-ts/lib/Either'
import { FindUserByEmail } from '../../../common/CommonTypes'
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
    const user = new User(request)
    const serializedUser = classToPlain(user) as FindUserByEmail

    const userAlreadyExists = await this.userRepository.exists(serializedUser)

    if (userAlreadyExists) {
      return left(
        new CreateUserErrors.EmailAlreadyExistsError(serializedUser.email),
      )
    }

    const newUser = await User.create(request)

    return right(Result.ok(newUser))
  }
}
