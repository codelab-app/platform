import { EntityRepository, Repository } from 'typeorm'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { TypeOrmPage } from '@codelab/backend'

@EntityRepository(TypeOrmPage)
export class TypeOrmPageRepositoryAdapter
  extends Repository<TypeOrmPage>
  implements PageRepositoryPort {}
