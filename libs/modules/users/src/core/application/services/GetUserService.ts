import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'

export class GetUserService {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(): Promise<Array<User>> {
    return this.userRepository.findAll()
  }
}
