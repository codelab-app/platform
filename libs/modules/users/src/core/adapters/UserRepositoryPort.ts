import {
  FindUserBy,
  FindUserByEmail,
  FindUserByID,
} from '../../common/CommonTypes'
import { User } from '../domain/user'
import { TypeOrmUser } from '@codelab/backend'

export interface UserRepositoryPort {
  // findUser(by: FindUserBy): Promise<TypeOrmUser | undefined>
  createUser(user: User): Promise<User>
  deleteUser(user: TypeOrmUser): Promise<Array<TypeOrmUser>>
  updateUser(existingUser: TypeOrmUser, updatedUser: User): Promise<TypeOrmUser>
  exists(by: FindUserBy): Promise<boolean>

  findUserById(by: FindUserByID): Promise<TypeOrmUser | undefined>
  findUserByEmail(by: FindUserByEmail): Promise<TypeOrmUser | undefined>
}
