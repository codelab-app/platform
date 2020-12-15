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
    const existingUser = await this.userRepository.findUserByEmail({
      email: request.email.toString(),
    })

    if (!existingUser) {
      return left(
        new DeleteUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const results = await this.userRepository.deleteUser(existingUser)

    return right(Result.ok(User.hydrate(results[0])))
  }
}
