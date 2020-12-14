import { DeleteResult } from 'typeorm'
import { FindUserBy } from '../../common/CommonTypes'
import { User } from '../domain/user'
import { UserEmail } from '../domain/user-email'
import { TypeOrmUser } from '@codelab/backend'

export interface UserRepositoryPort {
  findUser(by: FindUserBy): Promise<TypeOrmUser>
  createUser(user: User): Promise<User>
  deleteUser(email: UserEmail): Promise<DeleteResult>
  updateUser(user: User): Promise<User>
  exists(by: FindUserBy): Promise<boolean>
}
