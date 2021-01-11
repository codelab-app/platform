import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option, isNone } from 'fp-ts/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import {
  ByUserCondition,
  isUserEmail,
  isUserId,
} from '../../common/QueryConditions'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { User } from '../../core/domain/user'
import { NOID, TypeOrmUser } from '@codelab/backend'

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter
  extends AbstractRepository<TypeOrmUser>
  implements UserRepositoryPort {
  async findAll(): Promise<Array<User>> {
    const users: Array<TypeOrmUser> = await this.repository.find()

    return Promise.resolve(plainToClass(User, users))
  }

  async exists(user: ByUserCondition): Promise<boolean> {
    let existingUser: TypeOrmUser | undefined

    if (isUserId(user)) {
      existingUser = await this.repository.findOne(user.userId)
    }

    return !!existingUser
  }

  async create(user: User<NOID>): Promise<User> {
    const newUser: TypeOrmUser = await this.repository.save(user.toPlain())

    return plainToClass(User, newUser)
  }

  async delete(user: ByUserCondition): Promise<Option<User>> {
    const foundUser = await this.findOne(user)

    if (isNone(foundUser)) {
      return O.none
    }

    await this.repository.remove(foundUser.value.toPersistence())

    return Promise.resolve(foundUser)
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.repository.save({
      ...user.toPlain(),
    })

    return plainToClass(User, updatedUser)
  }

  async findMany(): Promise<Array<User>> {
    return Promise.resolve([])
  }

  async findOne(user: ByUserCondition): Promise<Option<User>> {
    let typeOrmUser

    if (isUserId(user)) {
      typeOrmUser = await this.repository.findOne(
        { id: user.userId },
        { select: ['id', 'email', 'password'] },
      )
    }

    if (isUserEmail(user)) {
      typeOrmUser = await this.repository.findOne(
        { email: user.email },
        { select: ['id', 'email', 'password'] },
      )
    }

    return typeOrmUser
      ? Promise.resolve(O.some(plainToClass(User, typeOrmUser)))
      : O.none
  }
}
