import { DeleteResult, EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { FindUserBy, FindUserByID } from '../../common/CommonTypes'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { User } from '../../core/domain/user'
import { UserEmail } from '../../core/domain/user-email'
import {TypeOrmUser} from '@codelab/backend';

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter
  extends BaseRepository<TypeOrmUser>
  implements UserRepositoryPort {
  async exists(searchBy: FindUserBy): Promise<boolean> {
    const entity = await this.findOne(searchBy)

    return !!entity
  }

  async createUser(user: User): Promise<User> {
    let typeOrmUser = new TypeOrmUser()

    typeOrmUser.email = user.email.toString()
    typeOrmUser.password = user.password.value
    typeOrmUser = await this.save(typeOrmUser)

    const u = new User({ email: typeOrmUser.email })

    return Promise.resolve(u)
  }

  async deleteUser(email: UserEmail): Promise<DeleteResult> {
    return this.delete({ email: email.toString() })
  }

  async updateUser(userId: string, user: User): Promise<User> {
    const foundUser: TypeOrmUser = await this.findUser({ id: userId })

    foundUser.email = user.email.toString()

    await this.update(foundUser.id, foundUser)

    const u = new User({ email: foundUser.email })

    return Promise.resolve(u)
  }

  async findUser(by: FindUserByID): Promise<TypeOrmUser> {
    const typeOrmUser = await this.findOneOrFail(
      { id: by.id },
      { select: ['id', 'email', 'password'] },
    )

    return Promise.resolve(typeOrmUser)
  }
}
