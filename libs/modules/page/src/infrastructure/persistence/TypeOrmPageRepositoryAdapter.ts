import { plainToClass } from 'class-transformer'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { TypeOrmPage } from '@codelab/backend'

@EntityRepository(TypeOrmPage)
export class TypeOrmPageRepositoryAdapter
  extends AbstractRepository<TypeOrmPage>
  implements PageRepositoryPort {
  async createPage(page: Page): Promise<Page> {
    const typeOrmPage = page.toPersistence()
    const savedPageTypeOrm = await this.repository.save(typeOrmPage)

    return plainToClass(Page, savedPageTypeOrm)
  }
}
