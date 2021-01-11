import { option as O } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { DeleteUserErrors } from './DeleteUserErrors'
import { DeleteUserRequest } from './DeleteUserRequest'
import { DeleteUserResponse } from './DeleteUserResponse'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { AppError, Result } from '@codelab/backend'

export class DeleteUserService implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute({ email }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const foundUser = await this.userRepository.findOne({ email })

    if (O.isNone(foundUser)) {
      return left(new DeleteUserErrors.UserNotFoundError(email))
    }

    const deletedUserResult = await this.userRepository.delete({
      email,
    })

    if (O.isSome(deletedUserResult)) {
      return right(Result.ok(deletedUserResult.value))
    }

    return left(new AppError())
  }
}
