import { option } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { AppError } from '../../../../../../../backend/src/core/application/common/errors/AppError'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { EditUserErrors } from './UpdateUserErrors'
import { UpdateUserRequest } from './UpdateUserRequest'
import { UpdateUserResponse } from './UpdateUserResponse'
import { UpdateUserUseCase } from './UpdateUserUseCase'
import { Result } from '@codelab/backend'

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute({
    id,
    ...userData
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const existingUser: Option<User> = await this.userRepository.findOne({
      id,
    })

    if (option.isNone(existingUser)) {
      return left(new EditUserErrors.UserNotFoundError(id))
    }

    const result = await this.userRepository.update({ id }, userData)

    if (option.isNone(result)) {
      return left(new AppError('App error'))
    }

    return right(Result.ok(result.value))
  }
}
