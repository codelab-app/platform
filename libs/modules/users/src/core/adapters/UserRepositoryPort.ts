import { DeleteResult } from 'typeorm'
import { FindUserBy } from '../../common/CommonTypes'
import { User } from '../domain/user'
import { UserEmail } from '../domain/user-email'
import { TypeOrmUser } from '@codelab/ddd/backend'

export interface UserRepositoryPort {
  // findUser(
  //   by: UserIdentity,
  //   options?: RepositoryFindOptions,
  // ): Promise<Optional<User>>

  // countUsers(by: UserIdentity, options?: RepositoryFindOptions): Promise<number>

  findUser(by: FindUserBy): Promise<TypeOrmUser>
  createUser(user: User): Promise<User>
  deleteUser(email: UserEmail): Promise<DeleteResult>
  updateUser(userId: string, user: User): Promise<User>

  exists(by: FindUserBy): Promise<boolean>
}
