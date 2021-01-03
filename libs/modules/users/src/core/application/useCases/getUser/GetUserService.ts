import { UsersRepositoryPort } from '../../../adapters/UsersRepositoryPort'
import { User } from '../../../domain/user'

export class GetUserService {
  constructor(private readonly userRepository: UsersRepositoryPort) {}

  async execute(): Promise<Array<User>> {
    return this.userRepository.findAll()
  }
}
