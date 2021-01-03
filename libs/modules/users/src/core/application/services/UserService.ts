import { Option } from 'fp-ts/Option'
import { UsersRepositoryPort } from '../../adapters/UsersRepositoryPort'
import { User } from '../../domain/user'

export class UserService {
  constructor(private readonly usersRepository: UsersRepositoryPort) {}

  findUserById(userId: string): Promise<Option<User>> {
    return this.usersRepository.findUser({ id: userId })
  }
}
