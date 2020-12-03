import { UserIdentity } from '../../common/CommonTypes'
import { User } from '../domain/user'

export interface UserRepositoryPort {
  // findUser(
  //   by: UserIdentity,
  //   options?: RepositoryFindOptions,
  // ): Promise<Optional<User>>

  // countUsers(by: UserIdentity, options?: RepositoryFindOptions): Promise<number>

  createUser(user: User): Promise<{ id: string }>

  // updateUser(user: User): Promise<void>

  exists(by: UserIdentity): Promise<boolean>
}
