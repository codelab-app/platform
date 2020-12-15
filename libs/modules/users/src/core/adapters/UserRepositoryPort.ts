import { Option } from 'fp-ts/Option'
import {
  FindUserBy,
  FindUserByEmail,
  FindUserByID,
} from '../../common/CommonTypes'
import { User } from '../domain/user'

export interface UserRepositoryPort {
  // findUser(by: FindUserBy): Promise<TypeOrmUser | undefined>
  createUser(user: User): Promise<User>
  deleteUser(user: User): Promise<Option<User>>
  updateUser(existingUser: User, updatedUser: User): Promise<User>
  exists(by: FindUserBy): Promise<boolean>

  findUserById(by: FindUserByID): Promise<Option<User>>
  findUserByEmail(by: FindUserByEmail): Promise<Option<User>>
}
