import { Page } from '../domain/page'

export interface PageRepositoryPort {
  createPage(page: Page): Promise<Page>
}
