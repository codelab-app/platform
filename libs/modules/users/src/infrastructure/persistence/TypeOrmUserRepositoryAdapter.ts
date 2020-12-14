import { DeleteResult, EntityRepository, Repository } from 'typeorm'
import { FindUserBy, FindUserByID } from '../../common/CommonTypes'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { User } from '../../core/domain/user'
import { UserEmail } from '../../core/domain/user-email'
import { TypeOrmUser } from '@codelab/backend'

@EntityRepository(TypeOrmUser)
// extends BaseRepository<TypeOrmUser>
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
    const updatedUser = await this.update(user.toPlain(), user.toPlain())

    console.log(updatedUser)

    // return User.hydrate()

    return user
    // return User.hydrate({})
  }

  async findUser(by: FindUserByID): Promise<TypeOrmUser> {
    const typeOrmUser = await this.findOneOrFail(
      { id: by.id },
      { select: ['id', 'email', 'password'] },
    )

    return Promise.resolve(typeOrmUser)
  }
}
