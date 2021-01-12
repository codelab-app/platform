import { Option } from 'fp-ts/Option'
import { ByUserCondition } from '../../common/QueryConditions'
import { UserDto } from '../../presentation/UserDto'
import { User } from '../domain/user'
import { NOID, RepositoryPort } from '@codelab/backend'

export abstract class UserRepositoryPort implements RepositoryPort<User> {
  abstract create(user: User<NOID>): Promise<User>

  abstract delete(user: ByUserCondition): Promise<Option<User>>

  abstract update(user: ByUserCondition, data: UserDto): Promise<Option<User>>

  abstract exists(by: ByUserCondition): Promise<boolean>

  abstract findOne(user: ByUserCondition): Promise<Option<User>>

  abstract findMany(): Promise<Array<User>>

  abstract findAll(): Promise<Array<User>>
}
