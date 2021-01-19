import { Option } from 'fp-ts/lib/Option'
import { ByPageCondition, ByPageConditions } from '../../common/QueryConditions'
import { PageDto } from '../../presentation/PageDto'
import { Page } from '../domain/page'
import { RepositoryPort } from '@codelab/backend'

export abstract class PageRepositoryPort implements RepositoryPort<Page> {
  abstract delete(pageId?: string): Promise<Option<Page>>

  abstract findOne(page: ByPageCondition): Promise<Option<Page>>

  abstract findMany(pages: ByPageConditions): Promise<Array<Page>>

  abstract create(page: PageDto): Promise<Page>
}
