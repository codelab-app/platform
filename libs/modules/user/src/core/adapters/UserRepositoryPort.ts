import { Option } from 'fp-ts/Option'
import { User } from '../domain/user'
import { UserDTO, UserVO } from '../domain/user.codec'
import { RepositoryPort } from '@codelab/backend'

export abstract class UserRepositoryPort implements RepositoryPort<User> {
  abstract create(user: UserVO): Promise<Option<User>>

  abstract delete(user: UserDTO): Promise<Option<User>>

  abstract update(user: UserDTO, data: UserDTO): Promise<Option<User>>

  abstract exists(by: UserDTO): Promise<boolean>

  abstract findOne(user: UserDTO): Promise<Option<User>>
}
