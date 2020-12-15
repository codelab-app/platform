import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
import { EntityRepository, Repository } from 'typeorm'
import { FindUserBy } from '../../common/CommonTypes'
import { isEmail, isId } from '../../common/utils'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { User } from '../../core/domain/user'
import { TypeOrmUser } from '@codelab/backend'

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter
  extends Repository<TypeOrmUser>
  implements UserRepositoryPort {
  async exists(searchBy: FindUserBy): Promise<boolean> {
    const entity = await this.findOne(searchBy)

    return !!entity
  }

  async createUser(user: User): Promise<User> {
    const newUser: TypeOrmUser = await this.save(user.toPlain())

    return User.hydrate(newUser)
  }

  async deleteUser(user: User): Promise<Option<User>> {
    const typeOrmUser = plainToClass(TypeOrmUser, user.toPlain())
    const users = await this.remove([typeOrmUser])

    return users.length > 0
      ? Promise.resolve(O.some(User.hydrate(users[0])))
      : O.none
  }

  async updateUser(existingUser: User, user: User): Promise<User> {
    const plainUser = user.toPlain()
    const typeOrmExistingUser = plainToClass(
      TypeOrmUser,
      existingUser.toPlain(),
    )

    const updatedUser = await this.save({
      ...typeOrmExistingUser,
      ...plainUser,
    })

    return User.hydrate(updatedUser)
  }

  async findUser(by: FindUserBy): Promise<Option<User>> {
    let typeOrmUser

    if (isId(by)) {
      typeOrmUser = await this.findOne(
        { id: by.id },
        { select: ['id', 'email', 'password'] },
      )
    }

    if (isEmail(by)) {
      typeOrmUser = await this.findOne(
        { email: by.email },
        { select: ['id', 'email', 'password'] },
      )
    }

    return typeOrmUser
      ? Promise.resolve(O.some(User.hydrate(typeOrmUser)))
      : O.none
  }
}
