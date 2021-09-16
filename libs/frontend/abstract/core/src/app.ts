import { Page } from './page'

export interface App {
  id: string
  name: string
  pages: Array<Page>
}
