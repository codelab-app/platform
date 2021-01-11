import { Option } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { ValidateUserRequest } from './ValidateUserRequest'

export class ValidateUserService {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute({ userId }: ValidateUserRequest): Promise<Option<User>> {
    return this.userRepository.findOne({ userId })
  }
}
