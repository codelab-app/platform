import { plainToClass } from 'class-transformer'
import { option as O } from 'fp-ts'
import { Option } from 'fp-ts/Option'
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

    return Page.hydrate(Page, savedPageTypeOrm)
  }

  async deletePage(page: Page): Promise<Option<Page>> {
    const foundTypeOrmPage = await this.findOne(page.id.value)

    if (!foundTypeOrmPage) {
      return O.none
    }

    await this.remove(foundTypeOrmPage)

    return O.some(page)
  }
}
