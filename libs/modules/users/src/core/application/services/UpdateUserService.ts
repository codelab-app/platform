import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { EditUserErrors } from '../useCases/updateUser/UpdateUserErrors'
import { UpdateUserRequest } from '../useCases/updateUser/UpdateUserRequest'
import { UpdateUserResponse } from '../useCases/updateUser/UpdateUserResponse'
import { UpdateUserUseCase } from '../useCases/updateUser/UpdateUserUseCase'
import { Result } from '@codelab/backend'

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const u = User.update(request)

    const existingUser = await this.userRepository.findUserById({
      id: request.id.toString(),
    })

    if (!existingUser) {
      return left(
        new EditUserErrors.UserNotFoundError(request.email.toString()),
      )
    }

    const result = await this.userRepository.updateUser(existingUser, u)

    return right(Result.ok(User.hydrate(result)))
  }
}
