import { EntityRepository, Repository } from 'typeorm'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { TypeOrmPage } from '@codelab/backend'

@EntityRepository(TypeOrmPage)
export class TypeOrmPageRepositoryAdapter
  extends Repository<TypeOrmPage>
  implements PageRepositoryPort {
  async createPage(page: Page): Promise<Page> {
    const typeOrmPage = page.toPersistence()
    const savedPageTypeOrm = await this.save(typeOrmPage)

    return Page.hydrate(savedPageTypeOrm)
  }
}
