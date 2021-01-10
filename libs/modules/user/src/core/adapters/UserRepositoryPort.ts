import { Option } from 'fp-ts/Option'
import { FindUserBy } from '../../common/CommonTypes'
import { User } from '../domain/user'
import { NOID } from '@codelab/backend'

export interface UserRepositoryPort {
  createUser(user: User<NOID>): Promise<User>
  deleteUser(user: User): Promise<Option<User>>
  updateUser(user: User): Promise<User>
  exists(by: FindUserBy): Promise<boolean>
  findUser(by: FindUserBy): Promise<Option<User>>
  findAll(): Promise<Array<User>>
}
