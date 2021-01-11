import { plainToClass } from 'class-transformer'
import { option } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { EditUserErrors } from './UpdateUserErrors'
import { UpdateUserRequest } from './UpdateUserRequest'
import { UpdateUserResponse } from './UpdateUserResponse'
import { UpdateUserUseCase } from './UpdateUserUseCase'
import { Result } from '@codelab/backend'

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userToUpdate = plainToClass(User, request)

    const existingUser: Option<User> = await this.userRepository.findOne({
      userId: request.id.toString(),
    })

    if (option.isNone(existingUser)) {
      return left(
        new EditUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const result = await this.userRepository.update(userToUpdate)

    return right(Result.ok(result))
  }
}
