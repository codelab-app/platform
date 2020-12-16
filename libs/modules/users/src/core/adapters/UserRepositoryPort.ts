import { Option } from 'fp-ts/Option'
import { FindUserBy } from '../../common/CommonTypes'
import { User } from '../domain/user'

export interface UserRepositoryPort {
  createUser(user: User): Promise<User>
  deleteUser(user: User): Promise<Option<User>>
  updateUser(existingUser: User, updatedUser: User): Promise<User>
  exists(by: FindUserBy): Promise<boolean>
  findUser(by: FindUserBy): Promise<Option<User>>
  findAll(): Promise<Array<User>>
}
