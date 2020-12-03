import { EntityRepository } from 'typeorm'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { UserIdentity } from '../../common/CommonTypes'
import { UserRepositoryPort } from '../../core/adapters/UserRepositoryPort'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter
  extends BaseRepository<TypeOrmUser>
  implements UserRepositoryPort {
  async exists(searchBy: UserIdentity): Promise<boolean> {
    const entity = await this.findOne(searchBy)

    return !!entity
  }
}
