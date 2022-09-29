import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IElementExport } from './element.interface'
import { IStoreExport } from './store.interface'

export type IAppExport = Pick<OGM_TYPES.App, 'id' | 'name' | 'slug'> & {
  pages: Array<IPageExport>
  store: IStoreExport
  domains: Array<IDomainExport>
}

export type IPageExport = Pick<OGM_TYPES.Page, 'id' | 'name' | 'slug'> & {
  rootElement: Pick<IElementExport, 'id' | 'name'>
  elements: Array<OGM_TYPES.Element>
  components: Array<OGM_TYPES.Component>
}

export interface IDomainExport {
  id: string
  name: string
  app: {
    id: string
  }
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
