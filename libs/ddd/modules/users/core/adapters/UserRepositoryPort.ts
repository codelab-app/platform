import { FindUserBy } from '../../common/CommonTypes'

export interface UserRepositoryPort {
  // findUser(
  //   by: UserIdentity,
  //   options?: RepositoryFindOptions,
  // ): Promise<Optional<User>>

  // countUsers(by: UserIdentity, options?: RepositoryFindOptions): Promise<number>

  // createUser(user: User): Promise<{ id: string }>

  // updateUser(user: User): Promise<void>

  exists(by: FindUserBy): Promise<boolean>
}
