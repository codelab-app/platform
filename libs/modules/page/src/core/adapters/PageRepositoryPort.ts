import { Option } from 'fp-ts/Option'
import { AppDTO } from '../../../../app/src/core/domain/app.codec'
import { Page } from '../domain/page'
import { PageDTO, PageVO } from '../domain/page.codec'
import { RepositoryPort } from '@codelab/backend'

export abstract class PageRepositoryPort implements RepositoryPort<Page> {
  abstract create(page: PageVO, appId: string): Promise<Option<Page>>

  abstract delete(page: PageDTO): Promise<Option<Page>>

  abstract update(page: PageDTO, data: PageDTO): Promise<Option<Page>>

  abstract exists(by: PageDTO): Promise<boolean>

  abstract findOne(page: PageDTO): Promise<Option<Page>>

  abstract findMany(page: { app: AppDTO }): Promise<Array<Page>>
}
