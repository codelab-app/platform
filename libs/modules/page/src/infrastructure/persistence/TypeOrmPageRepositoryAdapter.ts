import { plainToClass } from 'class-transformer'
import { Option } from 'fp-ts/lib/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { ByPageConditions, ByPageId } from '../../common/QueryConditions'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { TypeOrmPage } from '@codelab/backend'

@EntityRepository(TypeOrmPage)
export class TypeOrmPageRepositoryAdapter
  extends AbstractRepository<TypeOrmPage>
  implements PageRepositoryPort {
  async delete(pageId: string): Promise<Option<Page>> {
    throw new Error('Method not implemented.')
  }

  async findOne(page: ByPageId): Promise<Option<Page>> {
    throw new Error('Method not implemented.')
  }

  async findMany({ appId }: ByPageConditions): Promise<Array<Page>> {
    const foundPages = await this.repository.find({
      relations: ['app'],
      where: {
        app: {
          id: appId,
        },
      },
    })

    return plainToClass(Page, foundPages)
  }

  async create(page: Page): Promise<Page> {
    const typeOrmPage = page.toPersistence()
    const savedPageTypeOrm = await this.repository.save(typeOrmPage)

    return plainToClass(Page, savedPageTypeOrm)
  }
}
