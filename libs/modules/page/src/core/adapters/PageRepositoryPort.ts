import { Page } from '../domain/page'
import { Option } from 'fp-ts/Option';
import { ByPageConditions, ByPageId } from '@codelab/modules/page';

export abstract class PageRepositoryPort {
  abstract deletePage(pageId: string): Promise<Option<Page>>

  abstract createPage(page: Page): Promise<Page>

  abstract findSingle(page: ByPageId): Promise<Option<Page>>

  abstract findMany({appId}: ByPageConditions): Promise<Array<Page>>
}


