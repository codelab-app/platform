import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { DeleteUserErrors } from '../useCases/deleteUser/DeleteUserErrors'
import { DeleteUserRequest } from '../useCases/deleteUser/DeleteUserRequest'
import { DeleteUserResponse } from '../useCases/deleteUser/DeleteUserResponse'
import { DeleteUserUseCase } from '../useCases/deleteUser/DeleteUserUseCase'
import { Result } from '@codelab/backend'

export class DeleteUserService implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const existingUser: Option<User> = await this.userRepository.findUserByEmail(
      {
        email: request.email.toString(),
      },
    )

    const leftResult = left(
      new DeleteUserErrors.UserNotFoundError(request.email.toString()),
    )

    if (O.isNone(existingUser)) {
      return leftResult
    }

    const result = await this.userRepository.deleteUser(existingUser.value)

    if (O.isSome(result)) {
      return right(Result.ok(result.value))
    }

    return leftResult
  }
}
