import { Option } from 'fp-ts/Option'
import { EntityManager } from 'typeorm'
import { Page } from '../domain/page'

export abstract class PageRepositoryPort {
  abstract manager?: EntityManager

  abstract createPage(page: Page): Promise<Page>

  abstract deletePage(page: Page): Promise<Option<Page>>
}
