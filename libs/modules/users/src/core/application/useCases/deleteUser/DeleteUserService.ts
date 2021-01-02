import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { DeleteUserErrors } from './DeleteUserErrors'
import { DeleteUserRequest } from './DeleteUserRequest'
import { DeleteUserResponse } from './DeleteUserResponse'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { AppError, Result } from '@codelab/backend'

export class DeleteUserService implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const existingUser: Option<User> = await this.userRepository.findUser({
      email: request.email.toString(),
    })

    if (O.isNone(existingUser)) {
      return left(
        new DeleteUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const deletedUserResult = await this.userRepository.deleteUser(
      existingUser.value,
    )

    if (O.isSome(deletedUserResult)) {
      return right(Result.ok(deletedUserResult.value))
    }

    return left(new AppError())
  }
}
