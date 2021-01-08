import { Option } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { ValidateUserRequest } from './ValidateUserRequest'

export class ValidateUserService {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(request: ValidateUserRequest): Promise<Option<User>> {
    return this.userRepository.findUser({ id: request.userId })
  }
}
