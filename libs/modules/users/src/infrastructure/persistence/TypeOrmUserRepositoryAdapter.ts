import { DeleteResult, EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { FindUserBy } from '../../common/CommonTypes'
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

  async createUser(user: User): Promise<TypeOrmUser> {
    const u = new TypeOrmUser()

    u.email = user.email.toString()
    u.password = user.password.value

    return this.save(u)
  }

  async deleteUser(email: UserEmail): Promise<DeleteResult> {
    return this.delete({ email: email.toString() })
  }

  async updateUser(user: User): Promise<User> {
    const u = new TypeOrmUser()

    u.email = user.email.toString()
    await this.update({ email: user.email.toString() }, u)

    return Promise.resolve(user)
  }
}
