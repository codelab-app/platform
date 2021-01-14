import { plainToClass } from 'class-transformer'
import { Option } from 'fp-ts/lib/Option'
import { AbstractRepository, EntityRepository } from 'typeorm'
import { ByPageConditions, ByPageId } from '../../common/QueryConditions'
import { PageRepositoryPort } from '../../core/adapters/PageRepositoryPort'
import { Page } from '../../core/domain/page'
import { PageDto } from '../../presentation/PageDto'
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

  async create(page: PageDto): Promise<Page> {
    const savedPageTypeOrm = await this.repository.save(page)

    return plainToClass(Page, savedPageTypeOrm)
  }
}
