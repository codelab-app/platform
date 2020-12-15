import { EntityRepository, Repository } from 'typeorm'
import {
  FindUserBy,
  FindUserByEmail,
  FindUserByID,
} from '../../common/CommonTypes'
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

  async deleteUser(user: TypeOrmUser): Promise<Array<TypeOrmUser>> {
    return this.remove([user])
  }

  async updateUser(
    existingUser: TypeOrmUser,
    user: User,
  ): Promise<TypeOrmUser> {
    const plain = user.toPlain()
    const updatedUser = await this.save({
      ...existingUser,
      ...plain,
    })

    return updatedUser
  }

  async findUserById(by: FindUserByID): Promise<TypeOrmUser | undefined> {
    const typeOrmUser = await this.findOne(
      { id: by.id },
      { select: ['id', 'email', 'password'] },
    )

    return Promise.resolve(typeOrmUser)
  }

  async findUserByEmail(by: FindUserByEmail): Promise<TypeOrmUser | undefined> {
    const typeOrmUser = await this.findOne(
      { email: by.email },
      { select: ['id', 'email', 'password'] },
    )

    return Promise.resolve(typeOrmUser)
  }
}
