import { DeleteResult, EntityRepository, Repository } from 'typeorm'
import { FindUserBy, FindUserByID } from '../../common/CommonTypes'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { User } from '../../core/domain/user'
import { UserEmail } from '../../core/domain/user-email'
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

  async deleteUser(email: UserEmail): Promise<DeleteResult> {
    return this.delete({ email: email.toString() })
  }

  async updateUser(user: User): Promise<User> {
    const plain = user.toPlain()
    const existingUser = await this.findOneOrFail({
      where: { id: plain.id },
      select: ['id', 'email', 'password'],
    })
    // Update returns UpdateResult not the entity, so cannot use if you want to return the user
    // back to the client
    // const updatedUser = await this.update(plain.id as string, user.toPlain())
    const updatedUser = await this.save({
      ...existingUser,
      ...plain,
    })
    // const hy = User.hydrate(updatedUser)

    return User.hydrate(updatedUser)
  }

  async findUser(by: FindUserByID): Promise<TypeOrmUser> {
    const typeOrmUser = await this.findOneOrFail(
      { id: by.id },
      { select: ['id', 'email', 'password'] },
    )

    return Promise.resolve(typeOrmUser)
  }
}
