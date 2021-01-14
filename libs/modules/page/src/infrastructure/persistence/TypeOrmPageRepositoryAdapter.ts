import { plainToClass } from 'class-transformer'
import { Option } from 'fp-ts/lib/Option'
import { EntityRepository } from 'typeorm'
import { ByPageConditions, ByPageId } from '../../common/QueryConditions'
import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { TypeOrmPage } from '@codelab/backend'

@EntityRepository(TypeOrmPage)
export class TypeOrmPageRepositoryAdapter
  extends BaseRepository<TypeOrmPage>
  implements PageRepositoryPort {
  async deletePage(pageId: string): Promise<Option<Page>> {
    throw new Error('Method not implemented.')
  }

  async findSingle(page: ByPageId): Promise<Option<Page>> {
    throw new Error('Method not implemented.')
  }

  async findMany({ appId }: ByPageConditions): Promise<Array<Page>> {
    const foundPages = await this.find({
      relations: ['app'],
      where: {
        app: {
          id: appId,
        },
      },
    })

    return plainToClass(Page, foundPages)
  }

  async createPage(page: Page): Promise<Page> {
    const typeOrmPage = page.toPersistence()
    const savedPageTypeOrm = await this.save(typeOrmPage)

    return plainToClass(Page, savedPageTypeOrm)
  }
}
