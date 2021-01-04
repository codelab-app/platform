import { Option } from 'fp-ts/Option'
import { UserRepositoryPort } from '../../adapters/UserRepositoryPort'
import { User } from '../../domain/user'

export class UserService {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  findUserById(userId: string): Promise<Option<User>> {
    return this.usersRepository.findUser({ id: userId })
  }
}
