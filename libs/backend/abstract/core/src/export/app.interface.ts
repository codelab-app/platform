import type { App } from '@codelab/backend/abstract/codegen'
import type { IDomainExport } from './domain.interface'
import type { IPageExport } from './page.interface'

export type IAppExport = Pick<App, 'id' | 'name' | 'slug'> & {
  domains: Array<IDomainExport>
  pages: Array<IPageExport>
  // store: IStoreExport
}

export interface ExportAppData {
  app: IAppExport
}
