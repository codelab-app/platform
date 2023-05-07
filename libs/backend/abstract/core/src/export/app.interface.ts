import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IDomainExport } from './domain.interface'
import type { IPageExport } from './page.interface'

export type IAppExport = Pick<OGM_TYPES.App, 'id' | 'name' | 'slug'> & {
  domains: Array<IDomainExport>
  pages: Array<IPageExport>
  // store: IStoreExport
}

export interface ExportAppData {
  app: IAppExport
}
