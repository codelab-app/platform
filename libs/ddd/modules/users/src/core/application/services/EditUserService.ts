import { right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'
import { EditUserRequest } from '../useCases/editUser/EditUserRequest'
import { EditUserResponse } from '../useCases/editUser/EditUserResponse'
import { EditUserUseCase } from '../useCases/editUser/EditUserUseCase'
import { Result } from '@codelab/ddd/backend'

export class EditUserService implements EditUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: EditUserRequest): Promise<EditUserResponse> {
    const u = User.update(request)

    const result = await this.userRepository.updateUser(request.userId, u)

    return right(Result.ok(result))
  }
}
