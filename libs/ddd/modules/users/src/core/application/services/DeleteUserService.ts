import { right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { UserEmail } from '../../domain/user-email'
import { DeleteUserRequest } from '../useCases/deleteUser/DeleteUserRequest'
import { DeleteUserResponse } from '../useCases/deleteUser/DeleteUserResponse'
import { DeleteUserUseCase } from '../useCases/deleteUser/DeleteUserUseCase'
import { Result } from '@codelab/ddd/backend'

export class DeleteUserService implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const userEmail = new UserEmail({ value: request.email })
    const result = await this.userRepository.deleteUser(userEmail)

    return right(Result.ok(result))
  }

  onCommit(
    response: DeleteUserResponse,
    request: DeleteUserRequest,
  ): Promise<void> {
    return Promise.resolve(undefined)
  }

  onRollback(error: Error, request: DeleteUserRequest): Promise<void> {
    return Promise.resolve(undefined)
  }
}
