import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { UserEmail } from '../../domain/user-email'
import { DeleteUserErrors } from '../useCases/deleteUser/DeleteUserErrors'
import { DeleteUserRequest } from '../useCases/deleteUser/DeleteUserRequest'
import { DeleteUserResponse } from '../useCases/deleteUser/DeleteUserResponse'
import { DeleteUserUseCase } from '../useCases/deleteUser/DeleteUserUseCase'
import { Result } from '@codelab/ddd/backend'

export class DeleteUserService implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const userEmail = new UserEmail({ value: request.email })
    const result = await this.userRepository.deleteUser(userEmail)

    if (result.affected === 0) {
      return left(new DeleteUserErrors.UserNotFoundError(userEmail.toString()))
    }

    return right(Result.ok(result))
  }
}
