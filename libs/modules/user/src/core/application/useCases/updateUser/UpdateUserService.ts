import { option } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
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
    const userToUpdate = User.update(request)

    const existingUser: Option<User> = await this.userRepository.findUser({
      id: request.id.toString(),
    })

    if (option.isNone(existingUser)) {
      return left(
        new EditUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const result = await this.userRepository.updateUser(userToUpdate)

    return right(Result.ok(result))
  }
}
