import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IElementExport } from './element.interface'
import type { IStoreExport } from './store.interface'

export type IAppExport = Pick<OGM_TYPES.App, 'id' | 'name' | 'slug'> & {
  domains: Array<IDomainExport>
  pages: Array<IPageExport>
  store: IStoreExport
}

export type IPageExport = Pick<
  OGM_TYPES.Page,
  'id' | 'kind' | 'name' | 'pageContentContainer'
> & {
  components: Array<OGM_TYPES.Component>
  elements: Array<OGM_TYPES.Element>
  rootElement: Pick<IElementExport, 'id' | 'name'>
}

export interface IDomainExport {
  app: {
    id: string
  }
  id: string
  name: string
}

export interface ExportAppData {
  app: IAppExport
}

// export type IPageExport = {
//   id: string
//   name: string
//   rootElement: {
//     id: string
//     name: string | null
//   }
//   elements: Array<IElementExport>
//   components: Array<IComponentExport>
// }
